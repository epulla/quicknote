
from ..domain import NoteRepository, Note


class NoteReader:
    def __init__(self, note_repository: NoteRepository) -> None:
        self.note_repository = note_repository

    async def read_note_and_destroy(self, id: str) -> Note:
        response = await self.note_repository.get_note_by_id(id)
        await self.note_repository.soft_delete_note(id)
        return response
