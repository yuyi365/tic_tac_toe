from fastapi import HTTPException
from typing import List
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

PLAYER_ONE_TOKEN = "X"
EMPTY_TOKEN = "-"


class Board(BaseModel):
    slots: List[str]

    def check_avail(self, slot_index: int) -> bool:
        return self.slots[slot_index] == EMPTY_TOKEN

    def place_slot(self, slot_index: int) -> None:
        if self.check_avail(slot_index):
            self.slots[slot_index] = PLAYER_ONE_TOKEN


class Move(BaseModel):
    slot_index: int


def make_empty_board() -> Board:
    board = Board(slots=["-", "-", "-", "-", "-", "-", "-", "-", "-"])
    return board


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
