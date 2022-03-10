from http.client import HTTPException
from typing import List
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

PLAYER_ONE_TOKEN = "X"
EMPTY_TOKEN = "-"


class Board(BaseModel):
    slots: List[str]

    def check_avail(self, slot_index: int):
        if self.slots[slot_index] == EMPTY_TOKEN:
            return True

    def place_slot(self, slot_index: int):
        if EMPTY_TOKEN in self.slots[slot_index]:
            self.slots[slot_index] = PLAYER_ONE_TOKEN
            return BOARD


def make_empty_board():
    board = Board(slots=["-", "-", "-", "-", "-", "-", "-", "-", "-"])
    return board


BOARD = make_empty_board()


@app.get("/board", response_model=Board)
async def board():
    return BOARD


@app.post("/move", response_model=Board)
async def create_move(slot_index: int):
    if not BOARD.slots[slot_index]:
        raise HTTPException(status_code=404, detail="Invalid entry")
    elif not BOARD.check_avail(slot_index):
        raise HTTPException(status_code=404, detail="Spot already taken")
    else:
        BOARD.place_slot(slot_index)

    return BOARD
