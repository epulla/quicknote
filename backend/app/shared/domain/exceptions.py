

class DBConnectionError(Exception):
    """Raised when a repository could not stablish a connection"""

    def __init__(self, db_type: str):
        self.message = f"Connection to '{db_type}' has failed, please check your DB"
        super().__init__(self.message)
