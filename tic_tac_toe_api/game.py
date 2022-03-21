from typing import List
from pydantic import BaseModel


EMPTY_TOKEN = "-"


class Board(BaseModel):
    slots: List[str]

    def check_avail(self, slot_index: int) -> bool:
        return self.slots[slot_index] == EMPTY_TOKEN

    def place_slot(self, slot_index: int, token: str) -> None:
        if self.check_avail(slot_index):
            self.slots[slot_index] = token


class Move(BaseModel):
    slot_index: int
    token: str


def make_empty_board() -> Board:
    board = Board(slots=[EMPTY_TOKEN] * 9)
    return board
