from typing import Dict, List, Optional

import sqlalchemy
from psycopg2 import IntegrityError
from sqlalchemy import desc, select

from .game import Player
from .tables import boards, games, settings


def insert_game(conn: sqlalchemy.engine.Connection, pin: str) -> int:
    return conn.execute(games.insert().values(pin=pin).returning(games.c.id)).first().id


def insert_settings(
    conn: sqlalchemy.engine.Connection,
    game_id: int,
    player_one_token: str,
    player_two_token: str,
) -> int:
    return (
        conn.execute(
            settings.insert()
            .values(
                game_id=game_id,
                player_one_token=player_one_token,
                player_two_token=player_two_token,
            )
            .returning(settings.c.id)
        )
        .first()
        .id
    )


def insert_board(
    conn: sqlalchemy.engine.Connection, game_id: int, board: List[Player]
) -> int:
    return (
        conn.execute(
            boards.insert().values(game_id=game_id, board=board).returning(boards.c.id)
        )
        .first()
        .id
    )


def retrieve_board(
    conn: sqlalchemy.engine.Connection, game_id: int
) -> Optional[List[Player]]:
    query = (
        select(boards)
        .order_by(desc(boards.c.created_at))
        .where(boards.c.game_id == game_id)
    )
    result = conn.execute(query).first()
    if result is not None:
        return result.board
    else:
        return None


def retrieve_settings(
    conn: sqlalchemy.engine.Connection, game_id: int
) -> Dict[str, str]:
    query = select(settings.c.player_one_token, settings.c.player_two_token).where(
        settings.c.game_id == game_id
    )
    result = conn.execute(query).first()
    if result is None:
        raise IntegrityError()
    else:
        return result._asdict()
