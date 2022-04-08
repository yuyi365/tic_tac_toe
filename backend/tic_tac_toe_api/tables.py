from sqlalchemy import ARRAY, MetaData, Table, BigInteger, Column, String

metadata = MetaData()

games = Table(
    "games",
    metadata,
    Column("id", BigInteger, primary_key=True, autoincrement=True),
    Column("winning_player_id", BigInteger, nullable=True),
    Column("created_at")
)

boards = Table(
    "boards",
    metadata,
    Column("id", BigInteger, primary_key=True, autoincrement=True),
    Column("game_id", BigInteger, foreign_key=True),
    Column("board", ARRAY(String))
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
    Column("game_id", BigInteger, foreign_key=True, autoincrement=True),
    Column("player_id", BigInteger, foreign_key=True, autoincrement=True),
)



