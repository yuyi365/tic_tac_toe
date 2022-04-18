from sqlalchemy.exc import IntegrityError
import sqlalchemy
from . import repository
from .utils import make_pin
from typing import Dict


def create_new_game(conn: sqlalchemy.engine.Connection) -> Dict[str, str]:
    trying = True
    while trying:
        pin = make_pin()
        try:
            game_id = repository.insert_game(conn, pin)
        except IntegrityError:
            print("Duplicate pin found, trying again")
            pass
        else:
            trying = False
    return {"game_id": game_id, "pin": pin}
