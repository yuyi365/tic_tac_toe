import datetime

from sqlalchemy import (
    BigInteger,
    Column,
    DateTime,
    Enum,
    ForeignKey,
    MetaData,
    String,
    Table,
)
from sqlalchemy.dialects.postgresql import ARRAY

from .game import Player

metadata = MetaData()


games = Table(
    "games",
    metadata,
    Column("id", BigInteger, primary_key=True, autoincrement=True),
    Column("pin", String(4), nullable=False, unique=True),
    Column("winning_player", Enum(Player), nullable=True),
    Column(
        "created_at",
        DateTime(timezone=True),
        default=datetime.datetime.utcnow,
        nullable=False,
    ),
)


settings = Table(
    "settings",
    metadata,
    Column("id", BigInteger, primary_key=True, autoincrement=True),
    Column("game_id", BigInteger, ForeignKey("games.id")),
    Column("player_one_token", String(1), nullable=False),
    Column("player_two_token", String(1), nullable=False),
)


boards = Table(
    "boards",
    metadata,
    Column("id", BigInteger, primary_key=True, autoincrement=True),
    Column("game_id", BigInteger, ForeignKey("games.id"), nullable=False),
    Column("board", ARRAY(Enum(Player)), nullable=False),
    Column(
        "created_at",
        DateTime(timezone=True),
        default=datetime.datetime.utcnow,
        nullable=False,
    ),
)
