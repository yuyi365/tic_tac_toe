from typing import Any, Dict

from fastapi import FastAPI, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.routing import APIRoute
from sqlalchemy.exc import IntegrityError

from .db import create_engine
from .game import InvalidBoardIndex, InvalidConnectionError, SpotUnavailableError
from .mappers import map_board_response, map_new_game_response
from .models import (
    BoardResponse,
    InvalidBoardIndexErrorResponse,
    InvalidConnectionErrorResponse,
    InvalidGameIdErrorResponse,
    MoveRequest,
    NewGameResponse,
    SettingsRequest,
    SettingsResponse,
    SpotUnavailableErrorResponse,
)
from .service import create_new_game, get_board, manipulate_board, save_game_settings

description = """
TicTacToe API helps you launch an exciting tic-tac-toe game. 👾

## Board

You will be able to:

* **Create a new game**
* **Retrieve a board**
* **Add moves to the board**
* **Add game settings to a game**
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
    state["engine"] = create_engine()


@app.get(
    "/games/{game_id}/board",
    response_model=BoardResponse,
    responses={400: {"model": InvalidGameIdErrorResponse}},
    tags=["getBoard"],
)
async def board(game_id: int) -> BoardResponse:
    engine = state["engine"]

    try:
        with engine.connect() as conn:
            result = get_board(conn, game_id)
        return map_board_response(
            result["board"], result["tokens"], result["next_turn"]
        )
    except IntegrityError:
        raise HTTPException(status_code=403, detail="Invalid game id")


@app.post(
    "/games/{game_id}/move",
    responses={
        400: {"model": InvalidBoardIndexErrorResponse},
        403: {"model": SpotUnavailableErrorResponse},
    },
    tags=["makeMove"],
)
async def make_move(game_id: int, move: MoveRequest) -> JSONResponse:
    engine = state["engine"]

    try:
        with engine.connect() as conn:
            manipulate_board(conn, game_id, move.slot_index, move.player)
        return JSONResponse(status_code=status.HTTP_201_CREATED)
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
    status_code=status.HTTP_201_CREATED,
    tags=["makeSettings"],
)
async def make_settings(game_id: int, settings: SettingsRequest) -> SettingsResponse:
    engine = state["engine"]

    try:
        with engine.connect() as conn:
            save_game_settings(
                conn,
                game_id,
                settings.player_one_token,
                settings.player_two_token,
            )
    except IntegrityError:
        raise HTTPException(status_code=400, detail="Invalid game id")
