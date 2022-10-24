from ..domain import Note, InputNote, NoteRepository


class NoteCreator:
    def __init__(self, note_repository: NoteRepository) -> None:
        self.note_repository = note_repository

    async def create_note(self, input_note: InputNote) -> Note:
        created_note = Note.get_note_by_input_note(input_note)
        await self.note_repository.create_note(created_note, input_note.expires_in)
        return created_note
