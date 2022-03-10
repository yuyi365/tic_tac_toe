from fastapi import HTTPException
from fastapi import FastAPI

from .game import make_empty_board, Board, Move

app = FastAPI()

state = {}


@app.on_event("startup")
async def startup_event() -> None:
    state["board"] = make_empty_board()


@app.get("/board", response_model=Board)
async def board() -> Board:
    return state["board"]


@app.post("/move", response_model=Board)
async def create_move(move: Move) -> Board:
    board = state["board"]
    if move.slot_index not in range(len(board.slots)):
        raise HTTPException(status_code=404, detail="Invalid entry")
    elif not board.check_avail(move.slot_index):
        raise HTTPException(status_code=404, detail="Spot already taken")
    else:
        board.place_slot(move.slot_index)
        return board
