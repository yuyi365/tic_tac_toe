from typing import Dict, Any

from fastapi import HTTPException
from fastapi import FastAPI
from fastapi.routing import APIRoute

from .models import (
    BoardResponse,
    MoveRequest,
    SettingsRequest,
    NewGameResponse,
    InvalidBoardIndexErrorResponse,
    SpotUnavailableErrorResponse,
    InvalidConnectionErrorResponse,
    InvalidGameIdErrorResponse,
)
from .game import (
    make_empty_board,
    make_default_tokens,
    InvalidBoardIndex,
    SpotUnavailableError,
    InvalidConnectionError,
    InvalidGameIdError,
)

from .mappers import map_board_response, map_new_game_response
from .service import create_new_board, create_new_game, save_game_settings
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
    "/move",
    response_model=BoardResponse,
    responses={
        400: {"model": InvalidBoardIndexErrorResponse},
        403: {"model": SpotUnavailableErrorResponse},
    },
    tags=["makeMove"],
)
async def make_move(move: MoveRequest) -> BoardResponse:
    board = state["board"]
    tokens = state["tokens"]
    try:
        new_board = create_new_board(board, move.slot_index, move.player)
        state["board"] = new_board
        return map_board_response(board, tokens)
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
async def new_game() -> NewGameResponse:
    engine = state["engine"]

    try:
        with engine.connect() as conn:
            result = create_new_game(conn)
        return map_new_game_response(result["game_id"], result["pin"])
    except InvalidConnectionError:
        raise HTTPException(status_code=502, detail="API connection error")


@app.post(
    "/games/{game_id}/settings",
    response_model=BoardResponse,
    responses={
        400: {"model": InvalidGameIdErrorResponse},
    },
    tags=["makeMove"],
)
async def make_settings(settings: SettingsRequest) -> BoardResponse:
    engine = state["engine"]

    try:
        with engine.connect() as conn:
            save_game_settings(
                conn,
                settings.game_id,
                settings.player_one_token,
                settings.player_two_token,
            )
    except InvalidGameIdError:
        raise HTTPException(status_code=403, detail="Invalid game id")
