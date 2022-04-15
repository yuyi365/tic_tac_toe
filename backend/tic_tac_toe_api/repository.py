import sqlalchemy
from .tables import games


def insert_game(conn: sqlalchemy.engine.Connection, pin: str) -> int:
    return conn.execute(games.insert().values(pin=pin).returning(games.c.id)).first().id
