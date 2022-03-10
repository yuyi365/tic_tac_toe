from typing import List
from pydantic import BaseModel


PLAYER_ONE_TOKEN = "X"
EMPTY_TOKEN = "-"


class Board(BaseModel):
    slots: List[str]

    def check_avail(self, slot_index: int) -> bool:
        return self.slots[slot_index] == EMPTY_TOKEN

    def place_slot(self, slot_index: int) -> None:
        if self.check_avail(slot_index):
            self.slots[slot_index] = PLAYER_ONE_TOKEN


class Move(BaseModel):
    slot_index: int


def make_empty_board() -> Board:
    board = Board(slots=["-", "-", "-", "-", "-", "-", "-", "-", "-"])
    return board
