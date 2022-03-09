from typing import List
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class Board(BaseModel):
    row1: List[int]
    row2: List[int]
    row3: List[int]

    def place_slot(self, slot: int, token="X"):
        if slot in self.row1:
            self.row1[slot] = token
            return BOARD
        elif slot in self.row2:
            self.row2[slot] = token
            return BOARD
        elif slot in self.row3:
            self.row3[slot] = token
            return BOARD
        else:
            return BOARD


class Move(BaseModel):
    slot: int
    token: str


def make_empty_board():
    board = Board(row1=[1, 2, 3], row2=[4, 5, 6], row3=[7, 8, 9])
    return board


BOARD = make_empty_board()


@app.get("/board", response_model=Board)
async def board():
    return BOARD


@app.post("/move", response_model=Move)
async def create_move(move: Move):
    BOARD.place_slot(move)
    return move
