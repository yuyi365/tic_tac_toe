from enum import Enum
from typing import Dict, List, Optional


class Player(Enum):
    ONE = 1
    TWO = 2


class Board:
    def __init__(self, slots: List[Optional[Player]]) -> None:
        self.slots = slots

    def __eq__(self, other: object) -> bool:
        if isinstance(other, Board):
            return self.slots == other.slots
        else:
            return False

    def place_slot(self, slot_index: int, player: Player) -> None:
        if slot_index not in range(len(self.slots)):
            raise InvalidBoardIndex(f"not a valid slot index: {slot_index}")
        elif self.slots[slot_index] is not None:
            raise SpotUnavailableError(f"slot at index already taken: {slot_index}")
        else:
            self.slots[slot_index] = player


def make_empty_board() -> Board:
    board = Board(slots=[None] * 9)
    return board


def make_default_tokens() -> Dict[Optional[Player], str]:
    return {
        None: "",
        Player.ONE: "🦄",
        Player.TWO: "🍄",
    }


class InvalidBoardIndex(Exception):
    pass


class SpotUnavailableError(Exception):
    pass


class InvalidConnectionError(Exception):
    pass
