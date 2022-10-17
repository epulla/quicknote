from uuid import uuid4
from datetime import datetime

from .input_note import InputNote

from pydantic import BaseModel


class Note(BaseModel):
    id: str = str(uuid4())
    content: str
    created: datetime = datetime.now()
    deleted: datetime = None

    @classmethod
    def get_note_by_input_note(cls, input_note: InputNote):
        return Note(content=input_note.content)
