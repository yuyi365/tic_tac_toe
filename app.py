from typing import List
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class Board(BaseModel):
    slots: List[int]
    rows: int


def make_empty_board():
    board = Board(slots=[1, 2, 3, 4, 5, 6, 7, 8, 9], rows=3)
    return board


@app.get("/board", response_model=Board)
async def board():
    board = make_empty_board()
    return board
