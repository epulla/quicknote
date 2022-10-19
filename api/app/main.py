from .note.domain import InputNote
from .note.infrastructure import NoteController, DummyNoteRepository

from fastapi import FastAPI


app = FastAPI()


note_controller = NoteController(note_repository=DummyNoteRepository())


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/create_note")
async def create_note(note: InputNote):
    created_note = await note_controller.create_note(note)
    return {'id': created_note.id}


@app.get("/note/{note_id}")
async def read_note_and_destroy(note_id: str):
    read_note = await note_controller.read_note_and_destroy(note_id)
    return read_note
