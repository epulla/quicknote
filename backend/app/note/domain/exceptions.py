

class NoteNotFound(Exception):
    """Raised when a note is not found in the DB"""

    def __init__(self):
        self.message = "Note not found"
        super().__init__(self.message)
