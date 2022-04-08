from sqlalchemy import ARRAY, MetaData, Table, BigInteger, Column, String, DateTime, ForeignKey, Enum
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
    Column("winning_player_id", BigInteger, nullable=True),
    Column("created_at", DateTime(timezone=True), default=datetime.datetime.utcnow, nullable=False)
)

boards = Table(
    "boards",
    metadata,
    Column("id", BigInteger, primary_key=True, autoincrement=True),
    Column("game_id", BigInteger, ForeignKey("games.id"), nullable=False),
    Column("board", ARRAY(Enum(PlayerIx)), nullable=False),
)

players = Table(
    "players",
    metadata,
    Column("id", BigInteger, primary_key=True, autoincrement=True),
    Column("created_at")
)

matches = Table(
    "matches",
    metadata,
    Column("id", BigInteger, primary_key=True, autoincrement=True),
    Column("token", String, Nullable=False),
    Column("game_id", BigInteger, ForeignKey("players.id"), nullable=False),
    Column("player_id", BigInteger, ForeignKey("games.id"), nullable=False),
    Column("created_at", DateTime(timezone=True), default=datetime.datetime.utcnow, nullable=False)
)



