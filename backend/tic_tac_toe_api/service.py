from psycopg2 import DataError
from sqlalchemy.exc import IntegrityError
import sqlalchemy
from typing import Union
from . import repository
from .utils import make_pin
from .game import Player, Board


def create_new_game(conn: sqlalchemy.engine.Connection) -> Union[int, str]:
    trying = True
    while trying:
        pin = make_pin()
        try:
            game_id = repository.insert_game(conn, pin)
        except IntegrityError:
            print("Duplicate pin found, trying again")
            conn.rollback()
        except DataError as e:
            print("There has been a data issue with the input")
            raise e
        else:
            trying = False
    return {"game_id": game_id, "pin": pin}


def create_new_board(
    board: Board,
    slot_index: int,
    player: Player,
) -> Board:
    board.place_slot(slot_index, player)
    return board
