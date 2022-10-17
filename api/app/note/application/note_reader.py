
import typing
from ..domain.note_repository import NoteRepository


class NoteReader:
    def __init__(self, note_repository: NoteRepository) -> None:
        self.note_repository = note_repository

    async def read_note(self, id: str) -> typing.Dict:
        response = await self.note_repository.get_note_by_id(id)
        await self.note_repository.soft_delete_note(id)
        return response.__dict__
