from typing import Dict, Any

from fastapi import HTTPException
from fastapi import FastAPI
from fastapi.routing import APIRoute

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
from .service import create_new_game, create_move
from .db import create_engine

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
    "/makemove",
    response_model=BoardResponse,
    responses={
        400: {"model": InvalidBoardIndexErrorResponse},
        403: {"model": SpotUnavailableErrorResponse},
    },
    tags=["makeMove"],
)
async def make_move(move: MoveRequest) -> BoardResponse:
    engine = state["engine"]
    board = state["board"]
    tokens = state["tokens"]

    try:
        with engine.connect() as conn:
            result = create_move(conn, move.slot_index, move.player, board, tokens)
        return map_board_response(result["board"], result["tokens"])
    except InvalidBoardIndex:
        raise HTTPException(
            status_code=400, detail="Invalid entry - slot index must be between 0 and 8"
        )
    except SpotUnavailableError:
        raise HTTPException(status_code=403, detail="Spot already taken")


@app.post(
    "/newgame",
    response_model=NewGameResponse,
    responses={
        502: {"model": InvalidConnectionErrorResponse},
    },
    tags=["makeNewGame"],
)
def new_game() -> NewGameResponse:
    engine = state["engine"]

    try:
        with engine.connect() as conn:
            result = create_new_game(conn)
        return map_new_game_response(result["game_id"], result["pin"])
    except InvalidConnectionError:
        raise HTTPException(status_code=502, detail="API connection error")
