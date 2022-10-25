from base64 import encode
import binascii

from .note.domain import InputNote
from .note.domain.exceptions import NoteNotFound
from .note.application import NoteEncrypter
from .note.infrastructure import NoteController, DummyNoteRepository, RedisNoteRepository

from .url.domain import InputUrl
from .url.domain.exceptions import UrlNotFound
from .url.application import UrlEncoder
from .url.infrastructure import RedisUrlRepository, UrlShorterController

from .shared.application import Base64StrEncoder, AESEncrypter
from .shared.domain import ExceptionResponse
from .shared.domain.exceptions import DBConnectionError

from fastapi import FastAPI, Request


app = FastAPI()


note_controller = NoteController(
    note_repository=RedisNoteRepository(),
    note_encrypter=NoteEncrypter(encrypter=AESEncrypter())
)
str_encoder = Base64StrEncoder()
url_encoder = UrlEncoder(str_encoder=str_encoder)
url_shorter_controller = UrlShorterController(url_repository=RedisUrlRepository() ,str_encoder=str_encoder)


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
    shorted_url = await url_shorter_controller.create_short_url(InputUrl(original_url=encoded_url, expires_in=input_note.expires_in))
    return {"url": shorted_url}


@app.get("/api/note/{shorted_url}")
async def read_note_and_destroy(shorted_url: str):
    try:
        encoded_url = await url_shorter_controller.get_original_url(shorted_url)
        key, tag, nonce, id = url_encoder.decode_many_to_url(
            encoded_url, separator=URL_SEPARATOR, limit=4
        )
        return await note_controller.read_note_and_destroy(id, key, tag, nonce)
    except (NoteNotFound, UrlNotFound) as e:
        return ExceptionResponse(exception=e, status_code=404)
    except (UnicodeDecodeError, binascii.Error) as e:
        return ExceptionResponse(exception=e, status_code=400, return_traceback=True)
