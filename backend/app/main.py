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
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from .config import get_settings


app = FastAPI()
settings = get_settings()


# Constants
REDIS_HOST = settings.redis_host # Default: "redis"
REDIS_PORT = settings.redis_port # Default: 6379
URL_SEPARATOR = settings.url_separator # Default: "&&&"
USE_URL_SHORTER = settings.use_url_shorter # Default: True


# App Set Up
note_controller = NoteController(
    note_repository=RedisNoteRepository(host=REDIS_HOST, port=REDIS_PORT),
    note_encrypter=NoteEncrypter(encrypter=AESEncrypter())
)
str_encoder = Base64StrEncoder()
url_encoder = UrlEncoder(str_encoder=str_encoder)
url_shorter_controller = UrlShorterController(
    url_repository=RedisUrlRepository(host=REDIS_HOST, port=REDIS_PORT), str_encoder=str_encoder)


# Middlewares
origins = ["*", "http://localhost"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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
    if USE_URL_SHORTER:
        shorted_url = await url_shorter_controller.create_short_url(InputUrl(original_url=encoded_url, expires_in=input_note.expires_in))
        return {"url": shorted_url}
    else:
        return {"url": encoded_url}


@app.get("/api/note/{url}")
async def read_note_and_destroy(url: str):
    try:
        if USE_URL_SHORTER:
            encoded_url = await url_shorter_controller.get_original_url(url)
        else:
            encoded_url = url

        key, tag, nonce, id = url_encoder.decode_many_to_url(
            encoded_url, separator=URL_SEPARATOR, limit=4
        )
        return await note_controller.read_note_and_destroy(id, key, tag, nonce)
    except (NoteNotFound, UrlNotFound) as e:
        return ExceptionResponse(exception=e, status_code=404)
    except (UnicodeDecodeError, binascii.Error) as e:
        return ExceptionResponse(exception=e, status_code=400, return_traceback=True)
