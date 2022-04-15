import sqlalchemy
from . import repository
from .utils import make_pin


def create_new_game(conn: sqlalchemy.engine.Connection):
    pin = make_pin()
    repository.insert_game(conn, pin)
