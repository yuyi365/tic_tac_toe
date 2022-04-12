"""Creates games table

Revision ID: 4cd7e2f46e4a
Revises:
Create Date: 2022-04-07 14:49:38.925582

"""
from alembic import op
import sqlalchemy as sa

revision = "4cd7e2f46e4a"
down_revision = None
branch_labels = None
depends_on = None


def upgrade():

    op.create_table(
        "games",
        sa.Column("id", sa.BigInteger(), autoincrement=True, nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )


def downgrade():
    op.drop_table("games")
