"""Adds winner column to games table

Revision ID: dcee7e2182ad
Revises: 4cd7e2f46e4a
Create Date: 2022-04-07 14:59:58.807201

"""
from alembic import op
import sqlalchemy as sa


revision = "dcee7e2182ad"
down_revision = "4cd7e2f46e4a"
branch_labels = None
depends_on = None


def upgrade():
    op.add_column("games", sa.Column("winner", sa.String(length=100), nullable=True))
    op.execute("UPDATE games SET winner = 'player1'")
    op.alter_column("games", "winner", nullable=False)


def downgrade():
    op.drop_column("games", "winner")
