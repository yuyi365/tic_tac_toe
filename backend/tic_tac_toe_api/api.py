from fastapi import HTTPException
from fastapi import FastAPI

from .game import (
    make_empty_board,
    Board,
    MoveRequest,
    BoardResponse,
)

description = """
TicTacToe API helps you launch an exciting tic-tac-toe game. 👾

## Board

You will be able to:

* **Retrieve a board**
* **Add moves to the board**
"""

app = FastAPI(
    title="TicTacToeApp",
    description=description,
    version="0.0.1",
    contact={
        "name": "Yuyi",
        "email": "yli@8thlight.com",
    },
)

state = {}


@app.on_event("startup")
async def startup_event() -> None:
    state["board"] = make_empty_board()


@app.get("/board", response_model=BoardResponse)
async def board() -> BoardResponse:
    board = state["board"]
    return BoardResponse(slots=board.slots)


@app.post("/move", response_model=BoardResponse)
async def create_move(move: MoveRequest) -> BoardResponse:
    board = state["board"]

    if move.slot_index not in range(len(board.slots)):
        raise HTTPException(
            status_code=400, detail="Invalid entry - slot index must be between 0 and 8"
        )
    elif not board.check_avail(move.slot_index):
        raise HTTPException(status_code=400, detail="Spot already taken")
    else:
        board.place_slot(move.slot_index)
        return BoardResponse(slots=board.slots)
