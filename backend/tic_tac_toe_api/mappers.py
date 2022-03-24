from .models import BoardResponse

from .game import Board


def map_board_response(board: Board) -> BoardResponse:
    return BoardResponse(slots=board.slots)
