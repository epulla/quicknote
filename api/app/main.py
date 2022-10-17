import typing

from .note.domain.input_note import InputNote
from .note.infrastructure.note_controller import NoteController
from .note.infrastructure.dummy_note_repository import DummyNoteRepository

from fastapi import FastAPI


app = FastAPI()


note_controller = NoteController(note_repository=DummyNoteRepository())


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/generate_note")
async def generate_note(note: InputNote):
    return await note_controller.create_note_and_get_id(note)


@app.get("/note/{note_id}")
async def read_note(note_id: str):
    return await note_controller.read_note(note_id)
