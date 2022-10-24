from .note.domain import InputNote
from .note.domain.exceptions import NoteNotFound
from .note.infrastructure import NoteController, DummyNoteRepository, RedisNoteRepository
from .shared.application import Base64StrEncoder

from fastapi import FastAPI, HTTPException


app = FastAPI()


note_controller = NoteController(note_repository=RedisNoteRepository())
id_encoder = Base64StrEncoder()


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
    except NoteNotFound:
        raise HTTPException(status_code=404, detail="Note not found")
