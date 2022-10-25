import binascii

from .note.domain import InputNote
from .note.domain.exceptions import NoteNotFound
from .note.application import NoteEncrypter
from .note.infrastructure import NoteController, DummyNoteRepository, RedisNoteRepository
from .shared.application import Base64StrEncoder, AESEncrypter, UrlEncoder
from .shared.domain import ExceptionResponse
from .shared.domain.exceptions import DBConnectionError

from fastapi import FastAPI, Request


app = FastAPI()


note_controller = NoteController(
    note_repository=RedisNoteRepository(),
    note_encrypter=NoteEncrypter(encrypter=AESEncrypter())
)
url_encoder = UrlEncoder(str_encoder=Base64StrEncoder())


# Constants
URL_SEPARATOR = "&&&"


# Middlewares
@app.middleware('http')
async def connection_checker(request: Request, call_next):
    try:
        await note_controller.note_repository.check_connection()
        return await call_next(request)
    except DBConnectionError as e:
        return ExceptionResponse(exception=e, status_code=500)


# Routers
@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/api/create_note")
async def create_note(input_note: InputNote):
    key, tag, nonce, created_note = await note_controller.create_note(input_note)
    encoded_url = url_encoder.encode_many_to_url(
        [key, tag, nonce, created_note.id], separator=URL_SEPARATOR
    )
    return {"url": encoded_url}


@app.get("/api/note/{encoded_url}")
async def read_note_and_destroy(encoded_url: str):
    try:
        key, tag, nonce, id = url_encoder.decode_many_to_url(
            encoded_url, separator=URL_SEPARATOR, limit=4
        )
        return await note_controller.read_note_and_destroy(id, key, tag, nonce)
    except NoteNotFound as e:
        return ExceptionResponse(exception=e, status_code=404)
    except (UnicodeDecodeError, binascii.Error) as e:
        return ExceptionResponse(exception=e, status_code=400, return_traceback=True)
