from typing import List

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

    def place_slot(self, slot_index: int) -> None:
        if slot_index not in range(len(self.slots)):
            raise InvalidBoardIndex(f"not a valid slot index: {slot_index}")
        elif self.slots[slot_index] != EMPTY_TOKEN:
            raise SpotUnavailableError(f"slot at index already taken: {slot_index}")
        else:
            self.slots[slot_index] = PLAYER_ONE_TOKEN


def make_empty_board() -> Board:
    board = Board(slots=[EMPTY_TOKEN] * 9)
    return board


class InvalidBoardIndex(Exception):
    pass


class SpotUnavailableError(Exception):
    pass
