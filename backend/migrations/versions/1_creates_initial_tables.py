"""Creates initial tables

Revision ID: 1
Revises:
Create Date: 2022-04-13 16:20:59.968864

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision = "1"
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "games",
        sa.Column("id", sa.BigInteger(), autoincrement=True, nullable=False),
        sa.Column("pin", sa.String(length=4), nullable=False),
        sa.Column(
            "winning_player_ix", sa.Enum("ONE", "TWO", name="player"), nullable=True
        ),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("pin"),
    )
    op.create_table(
        "boards",
        sa.Column("id", sa.BigInteger(), autoincrement=True, nullable=False),
        sa.Column("game_id", sa.BigInteger(), nullable=False),
        sa.Column(
            "board",
            postgresql.ARRAY(sa.Enum("ONE", "TWO", name="player")),
            nullable=False,
        ),
        sa.ForeignKeyConstraint(
            ["game_id"],
            ["games.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "settings",
        sa.Column("id", sa.BigInteger(), autoincrement=True, nullable=False),
        sa.Column("game_id", sa.BigInteger(), nullable=True),
        sa.Column("player_one_token", sa.String(length=1), nullable=False),
        sa.Column("player_two_token", sa.String(length=1), nullable=False),
        sa.ForeignKeyConstraint(
            ["game_id"],
            ["games.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )


def downgrade():
    op.drop_table("settings")
    op.drop_table("boards")
    op.drop_table("games")
