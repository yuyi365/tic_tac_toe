from typing import List
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class Board(BaseModel):
    row1: List[int]
    row2: List[int]
    row3: List[int]

    def place_slot(self, slot: int):
        if slot in self.row1 and self.row1[slot] != "X":
            self.row1[slot] = "X"
            return BOARD
        elif slot in self.row2 and self.row1[slot] != "X":
            self.row2[slot] = "X"
            return BOARD
        elif slot in self.row3 and self.row1[slot] != "X":
            self.row3[slot] = "X"
            return BOARD
        else:
            return "please pic another number"


class Move(BaseModel):
    slot: int


def make_empty_board():
    board = Board(row1=[0, 1, 2], row2=[3, 4, 5], row3=[6, 7, 8])
    return board


BOARD = make_empty_board()


@app.get("/board", response_model=Board)
async def board():
    return BOARD


@app.post("/move", response_model=Move)
async def create_move(move: Move):
    if Move.slot == range(0, 9):
        BOARD.place_slot(move)
        return move
    else:
        return "please only select an integer between 0 and 9"
