from typing import List

from pydantic import BaseModel

from .game import Player


class BoardResponse(BaseModel):
    slots: List[str]
    next_turn: Player
    next_turn_token: str


class MoveRequest(BaseModel):
    slot_index: int
    player: Player


class SettingsRequest(BaseModel):
    player_one_token: str
    player_two_token: str


class SettingsResponse(BaseModel):
    response: int


class NewGameResponse(BaseModel):
    game_id: int
    pin: str


class ValidationErrorResponse(BaseModel):
    loc: List[str]
    msg: str
    type: str


class InvalidBoardIndexErrorResponse(BaseModel):
    detail: List[ValidationErrorResponse]


class SpotUnavailableErrorResponse(BaseModel):
    detail: List[ValidationErrorResponse]


class InvalidConnectionErrorResponse(BaseModel):
    detail: List[ValidationErrorResponse]


class InvalidGameIdErrorResponse(BaseModel):
    detail: List[ValidationErrorResponse]
