from .note.domain import InputNote
from .note.infrastructure import NoteController, DummyNoteRepository
from .shared.infrastructure import Base64StrEncoder

from fastapi import FastAPI


app = FastAPI()


note_controller = NoteController(note_repository=DummyNoteRepository())
str_encoder = Base64StrEncoder()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/create_note")
async def create_note(note: InputNote):
    created_note = await note_controller.create_note(note)
    encoded_id = str_encoder.encode_str(created_note.id)
    return {'id': encoded_id}


@app.get("/note/{note_id}")
async def read_note_and_destroy(note_id: str):
    decoded_note_id = str_encoder.decode_str(note_id)
    read_note = await note_controller.read_note_and_destroy(decoded_note_id)
    return read_note
