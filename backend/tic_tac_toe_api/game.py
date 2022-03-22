from typing import List
from pydantic import BaseModel


PLAYER_ONE_TOKEN = "X"
EMPTY_TOKEN = "-"


class Board:
    def __init__(self, slots: List[str]) -> None:
        self.slots = slots

    def __eq__(self, other: object) -> bool:
        if isinstance(other, Board):
            return self.slots == other.slots
        else:
            return False

    def check_avail(self, slot_index: int) -> bool:
        return self.slots[slot_index] == EMPTY_TOKEN

    def place_slot(self, slot_index: int) -> None:
        if self.check_avail(slot_index):
            self.slots[slot_index] = PLAYER_ONE_TOKEN


class BoardResponse(BaseModel):
    slots: List[str]


class MoveRequest(BaseModel):
    slot_index: int


def make_empty_board() -> Board:
    board = Board(slots=[EMPTY_TOKEN] * 9)
    return board
