import sqlalchemy
from .tables import games, settings


def insert_game(conn: sqlalchemy.engine.Connection, pin: str) -> int:
    return conn.execute(games.insert().values(pin=pin).returning(games.c.id)).first().id


def insert_settings(
    conn: sqlalchemy.engine.Connection,
    game_id: int,
    player_one_token: str,
    player_two_token,
):
    return conn.execute(
        settings.insert().values(
            game_id=game_id,
            player_one_token=player_one_token,
            player_two_token=player_two_token,
        )
    )
