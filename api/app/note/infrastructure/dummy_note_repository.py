import typing
from datetime import datetime

from ..domain.note import Note
from ..domain.note_repository import NoteRepository

from anyio import sleep
from pydantic import BaseModel


class DummyNoteRepository(NoteRepository, BaseModel):
    db: typing.Dict = {}

    async def create_note(self, note: Note):
        print(f"Saving note")
        await sleep(0.5)
        self.db[note.id] = note
        print(f"Note saved")
        print(self.db)

    async def get_note_by_id(self, id: str) -> Note:
        print(f"Getting note with id: {id}")
        await sleep(0.5)
        selected_note = self.db[id]
        response = Note(**selected_note.__dict__)
        return response

    async def soft_delete_note(self, id: str):
        print(f'Soft deleting note with id: {id}')
        await sleep(0.5)
        selected_note = self.db[id] 
        selected_note.content = ""
        selected_note.deleted = datetime.now()
        print(f'Note content was removed at {selected_note.deleted}')

    async def hard_delete_note(self, id: str):
        return await super().hard_delete_note(id)
