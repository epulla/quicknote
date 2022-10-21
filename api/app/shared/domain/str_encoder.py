from abc import ABC, abstractmethod


class StrEncoder(ABC):
    @abstractmethod
    def encode_str(message: str) -> str:
        """This method will encode an ID of a Note and return it"""
        pass

    @abstractmethod
    def decode_str(encoded_message: str) -> str:
        """This method will decode an encoded ID of a Note and return it"""
        pass
