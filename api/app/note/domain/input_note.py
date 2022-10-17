
from pydantic import BaseModel


class InputNote(BaseModel):
    content: str
