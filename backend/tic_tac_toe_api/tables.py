from sqlalchemy import (
    MetaData,
    Table,
    BigInteger,
    Column,
    String,
    DateTime,
    ForeignKey,
    Enum,
)
from sqlalchemy.dialects.postgresql import ARRAY
import datetime
import enum

metadata = MetaData()


class PlayerIx(enum.Enum):
    PLAYER_ONE = 1
    PLAYER_TWO = 2


games = Table(
    "games",
    metadata,
    Column("id", BigInteger, primary_key=True, autoincrement=True),
    Column("pin", String(4), nullable=False, unique=True),
    Column("winning_player_ix", Enum(PlayerIx), nullable=True),
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
    Column("board", ARRAY(Enum(PlayerIx)), nullable=False),
)
