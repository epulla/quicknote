
from ..domain.input_note import InputNote
from ..domain.note_repository import NoteRepository
from ..application.note_reader import NoteReader
from ..application.note_creator import NoteCreator


class NoteController:
    def __init__(self, note_repository: NoteRepository) -> None:
        self.note_repository = note_repository

    async def create_note_and_get_id(self, note: InputNote):
        note_creator = NoteCreator(self.note_repository)
        note = await note_creator.create_note(note)
        return {'id': note.id}

    async def read_note(self, id: str):
        note_reader = NoteReader(self.note_repository)
        return await note_reader.read_note(id) 
