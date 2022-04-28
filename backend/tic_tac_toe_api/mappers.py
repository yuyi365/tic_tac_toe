from typing import Dict, Optional

from .game import Board, Player
from .models import BoardResponse, NewGameResponse


def map_board_response(
    board: Board, tokens: Dict[Optional[Player], str], next_turn: Player
) -> BoardResponse:
    return BoardResponse(
        slots=[tokens[slot] for slot in board.slots], next_turn=next_turn
    )


def map_new_game_response(game_id: int, pin: str) -> NewGameResponse:
    return NewGameResponse(game_id=game_id, pin=pin)
