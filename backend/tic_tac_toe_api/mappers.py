from typing import Dict, Optional

from .models import BoardResponse
from .game import Board, Player


def map_board_response(
    board: Board, tokens: Dict[Optional[Player], str]
) -> BoardResponse:
    return BoardResponse(slots=[tokens[slot] for slot in board.slots])
