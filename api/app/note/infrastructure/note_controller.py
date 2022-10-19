from ..domain import InputNote, NoteRepository, Note
from ..application import NoteReader, NoteCreator


class NoteController:
    def __init__(self, note_repository: NoteRepository) -> None:
        self.note_repository = note_repository

    async def create_note(self, note: InputNote) -> Note:
        note_creator = NoteCreator(self.note_repository)
        return await note_creator.create_note(note)

    async def read_note_and_destroy(self, id: str) -> Note:
        note_reader = NoteReader(self.note_repository)
        return await note_reader.read_note_and_destroy(id)
