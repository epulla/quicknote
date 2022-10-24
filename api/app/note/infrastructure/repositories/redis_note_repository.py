import json
from datetime import datetime

from ...domain import NoteRepository, Note
from ...domain.exceptions import NoteNotFound

import redis.asyncio as redis


class RedisNoteRepository(NoteRepository):
    def __init__(self) -> None:
        self.conn = redis.Redis()

    async def create_note(self, note: Note, expiration_time: int):
        print("Saving note")
        await self.conn.set(note.id, json.dumps(note.__dict__, default=str), ex=expiration_time)
        print("Note saved")

    async def get_note_by_id(self, id: str) -> Note:
        print(f"Getting note with id: {id}")
        response = await self.conn.get(id)
        print(response)
        if response is None:
            raise NoteNotFound
        return Note(**json.loads(response))

    async def soft_delete_note(self, id: str):
        print(f"Soft deleting note with id: {id}")
        selected_note = await self.get_note_by_id(id)
        if selected_note.was_deleted:
            return
        selected_note.content = ""
        selected_note.deleted = datetime.now()
        # 'keepttl' flag helps to keep the expiration time set in 'self.create_note' function
        await self.conn.set(selected_note.id, json.dumps(selected_note.__dict__, default=str), keepttl=True)
