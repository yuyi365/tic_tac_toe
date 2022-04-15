from typing import Dict, Optional

from .models import BoardResponse, NewGameResponse
from .game import Board, Player


def map_board_response(
    board: Board, tokens: Dict[Optional[Player], str]
) -> BoardResponse:
    return BoardResponse(slots=[tokens[slot] for slot in board.slots])


def map_new_game_response(pin: str, game_id: int) -> NewGameResponse:
    return NewGameResponse(game_id=game_id, pin=pin)
