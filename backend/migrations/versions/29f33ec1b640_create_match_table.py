"""Creates match table

Revision ID: 29f33ec1b640
Revises: f6f7a97ebf9e
Create Date: 2022-04-11 10:59:16.767470

"""
from alembic import op
import sqlalchemy as sa


revision = "29f33ec1b640"
down_revision = "f6f7a97ebf9e"
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "matches",
        sa.Column("id", sa.BigInteger(), autoincrement=True, nullable=False),
        sa.Column("token", sa.String(), nullable=False),
        sa.Column("game_id", sa.BigInteger(), nullable=False),
        sa.Column("player_id", sa.BigInteger(), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.ForeignKeyConstraint(
            ["game_id"],
            ["players.id"],
        ),
        sa.ForeignKeyConstraint(
            ["player_id"],
            ["games.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )


def downgrade():
    op.drop_table("matches")
