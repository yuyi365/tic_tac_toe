from fastapi import HTTPException
from fastapi import FastAPI
from fastapi.routing import APIRoute


from .models import (
    BoardResponse,
    MoveRequest,
    InvalidBoardIndexErrorResponse,
    SpotUnavailableErrorResponse,
)
from .game import (
    make_empty_board,
    InvalidBoardIndex,
    SpotUnavailableError,
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


def custom_generate_unique_id(route: APIRoute):
    return f"{route.tags[0]}"


app = FastAPI(generate_unique_id_function=custom_generate_unique_id)


@app.on_event("startup")
async def startup_event() -> None:
    state["board"] = make_empty_board()


@app.get("/board", response_model=BoardResponse, tags=["getBoard"])
async def board() -> BoardResponse:
    board = state["board"]
    return BoardResponse(slots=board.slots)


@app.post(
    "/move",
    response_model=BoardResponse,
    responses={
        401: {"model": InvalidBoardIndexErrorResponse},
        402: {"model": SpotUnavailableErrorResponse},
    },
    tags=["makeMove"],
)
async def create_move(move: MoveRequest) -> BoardResponse:
    board = state["board"]

    try:
        board.place_slot(move.slot_index)
    except InvalidBoardIndex:
        raise HTTPException(
            status_code=401, detail="Invalid entry - slot index must be between 0 and 8"
        )
    except SpotUnavailableError:
        raise HTTPException(status_code=402, detail="Spot already taken")
    else:
        return BoardResponse(slots=board.slots)
