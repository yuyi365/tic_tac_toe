from typing import Dict, Any

from fastapi import HTTPException
from fastapi import FastAPI
from fastapi.routing import APIRoute
from sqlalchemy import create_engine

from .models import (
    BoardResponse,
    MoveRequest,
    NewGameResponse,
    InvalidBoardIndexErrorResponse,
    SpotUnavailableErrorResponse,
    InvalidConnectionErrorResponse,
)
from .game import (
    make_empty_board,
    make_default_tokens,
    InvalidBoardIndex,
    SpotUnavailableError,
    InvalidConnectionError,
)

from .mappers import map_board_response, map_new_game_response
from .service import create_new_game

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

state: Dict[str, Any] = {}


def custom_generate_unique_id(route: APIRoute):
    return f"{route.tags[0]}"


app = FastAPI(generate_unique_id_function=custom_generate_unique_id)


@app.on_event("startup")
async def startup_event() -> None:
    state["board"] = make_empty_board()
    state["tokens"] = make_default_tokens()
    state["engine"] = create_engine()


@app.get("/board", response_model=BoardResponse, tags=["getBoard"])
async def board() -> BoardResponse:
    board = state["board"]
    tokens = state["tokens"]
    return map_board_response(board, tokens)


@app.post(
    "/move",
    response_model=BoardResponse,
    responses={
        400: {"model": InvalidBoardIndexErrorResponse},
        403: {"model": SpotUnavailableErrorResponse},
    },
    tags=["makeMove"],
)
async def create_move(move: MoveRequest) -> BoardResponse:
    board = state["board"]
    tokens = state["tokens"]
    try:
        board.place_slot(move.slot_index, move.player)
    except InvalidBoardIndex:
        raise HTTPException(
            status_code=400, detail="Invalid entry - slot index must be between 0 and 8"
        )
    except SpotUnavailableError:
        raise HTTPException(status_code=403, detail="Spot already taken")
    else:
        return map_board_response(board, tokens)


@app.post("/newgame", response_model=NewGameResponse, tags=["makeNewGame"])
def new_game() -> NewGameResponse:
    engine = state["engine"]
    with engine.conn() as conn:
        result = create_new_game(conn)
    return map_new_game_response(result)
