import os
from functools import lru_cache

from pydantic import BaseSettings


class Settings(BaseSettings):
    redis_host: str = os.getenv("REDIS_HOST", "localhost")
    redis_port: int = os.getenv("REDIS_PORT", 6379)
    url_separator: str = os.getenv("URL_SEPARATOR", "&&&")
    use_url_shorter: bool = (os.getenv("USE_URL_SHORTER", "True") == "True")


@lru_cache
def get_settings():
    return Settings()
