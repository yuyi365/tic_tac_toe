from typing import List

from pydantic import BaseModel

from .game import Player


class BoardResponse(BaseModel):
    slots: List[str]


class MoveRequest(BaseModel):
    slot_index: int
    player: Player


class ValidationErrorResponse(BaseModel):
    loc: List[str]
    msg: str
    type: str


class InvalidBoardIndexErrorResponse(BaseModel):
    detail: List[ValidationErrorResponse]


class SpotUnavailableErrorResponse(BaseModel):
    detail: List[ValidationErrorResponse]
