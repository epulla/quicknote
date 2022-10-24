import binascii

from .note.domain import InputNote
from .note.domain.exceptions import NoteNotFound
from .note.infrastructure import NoteController, DummyNoteRepository, RedisNoteRepository
from .shared.application import Base64StrEncoder
from .shared.domain import ExceptionResponse
from .shared.domain.exceptions import DBConnectionError

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse


app = FastAPI()


note_repository = RedisNoteRepository()
note_controller = NoteController(note_repository=note_repository)
id_encoder = Base64StrEncoder()


# Middlewares
@app.middleware('http')
async def connection_checker(request: Request, call_next):
    try:
        await note_repository.check_connection()
        return await call_next(request)
    except DBConnectionError as e:
        return ExceptionResponse(exception=e, status_code=500)


# Routers
@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/create_note")
async def create_note(input_note: InputNote):
    created_note = await note_controller.create_note(input_note)
    encoded_id = id_encoder.encode_str(created_note.id)
    return {"id": encoded_id}


@app.get("/note/{note_id}")
async def read_note_and_destroy(note_id: str):
    try:
        decoded_note_id = id_encoder.decode_str(note_id)
        return await note_controller.read_note_and_destroy(decoded_note_id)
    except NoteNotFound as e:
        return ExceptionResponse(exception=e, status_code=404)
    except (UnicodeDecodeError, binascii.Error) as e:
        return ExceptionResponse(exception=e, status_code=400, return_traceback=True)
