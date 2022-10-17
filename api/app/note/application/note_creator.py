from ..domain.note import Note
from ..domain.input_note import InputNote
from ..domain.note_repository import NoteRepository


class NoteCreator:

    def __init__(self, note_repository: NoteRepository) -> None:
        self.note_repository = note_repository

    async def create_note(self, note: InputNote) -> Note:
        created_note = Note.get_note_by_input_note(note)
        await self.note_repository.create_note(created_note)
        return created_note
