"""Creates player table

Revision ID: f6f7a97ebf9e
Revises: 9bdfe20aea1c
Create Date: 2022-04-11 10:56:13.114920

"""
from alembic import op
import sqlalchemy as sa


revision = "f6f7a97ebf9e"
down_revision = "9bdfe20aea1c"
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "players",
        sa.Column("id", sa.BigInteger(), autoincrement=True, nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )


def downgrade():
    op.drop_table("players")
