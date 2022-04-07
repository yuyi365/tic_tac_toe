from sqlalchemy import MetaData, Table, BigInteger, Column, String

metadata = MetaData()

games = Table(
    "games",
    metadata,
    Column("id", BigInteger, primary_key=True, autoincrement=True),
    Column("winner", String(100), nullable=False),
)
