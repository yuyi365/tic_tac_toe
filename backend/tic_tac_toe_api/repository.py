import sqlalchemy
from sqlalchemy.exc import DataError
from .tables import games


def insert_game(conn: sqlalchemy.engine.Connection, pin: str) -> int:
    try:
        return (
            conn.execute(games.insert().values(pin=pin).returning(games.c.id))
            .first()
            .id
        )
    except DataError as e:
        error = str(e.__dict__["orig"])
        return error
