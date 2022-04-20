from psycopg2 import DataError
from sqlalchemy.exc import IntegrityError
import sqlalchemy
from typing import Union
from . import repository
from .utils import make_pin
from .game import Player, Board, make_empty_board


def create_new_game(conn: sqlalchemy.engine.Connection) -> Union[int, str]:
    trying = True
    while trying:
        pin = make_pin()
        try:
            game_id = repository.insert_game(conn, pin)
            conn.commit()
        except IntegrityError:
            print("Duplicate pin found, trying again")
            conn.rollback()
        except DataError as e:
            print("There has been a data issue with the input")
            raise e
        else:
            trying = False
    return {"game_id": game_id, "pin": pin}


def save_game_settings(
    conn: sqlalchemy.engine.Connection,
    game_id: int,
    player_one_token: str,
    player_two_token: str,
) -> None:
    try:
        repository.insert_settings(conn, game_id, player_one_token, player_two_token)
        conn.commit()
    except IntegrityError as e:
        print("Game not found, please try again")
        conn.rollback()
        raise e


def manipulate_board(
    conn: sqlalchemy.engine.Connection,
    game_id: int,
    slot_index: int,
    player: Player,
) -> None:
    slots = repository.retrieve_board(conn, game_id)
    if slots is None:
        board = make_empty_board()
    else:
        board = Board(slots=slots)
    board.place_slot(slot_index, player)
    repository.insert_board(conn, game_id, board.slots)
    conn.commit()


def get_board(conn: sqlalchemy.engine.Connection, game_id: int) -> Board:
    slots = repository.retrieve_board(conn, game_id)
    settings = repository.retrieve_settings(conn, game_id)
    tokens = {
        Player.EMPTY: "",
        Player.ONE: settings["player_one_token"],
        Player.TWO: settings["player_two_token"],
    }
    if slots is None:
        board = make_empty_board()
    else:
        board = Board(slots=slots)
    return {"board": board, "tokens": tokens}
