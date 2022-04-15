import sqlalchemy
from . import repository
from .utils import make_pin
from typing import Dict


def create_new_game(conn: sqlalchemy.engine.Connection) -> Dict[str, str]:
    pin = make_pin()
    game_id = repository.insert_game(conn, pin)
    return {"game_id": game_id, "pin": pin}
