"""Creates board table

Revision ID: 9bdfe20aea1c
Revises: dcee7e2182ad
Create Date: 2022-04-11 10:47:42.252542

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = "9bdfe20aea1c"
down_revision = "dcee7e2182ad"
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "boards",
        sa.Column("id", sa.BigInteger(), autoincrement=True, nullable=False),
        sa.Column("game_id", sa.BigInteger(), nullable=False),
        sa.Column(
            "board",
            postgresql.ARRAY(sa.Enum("PLAYER_ONE", "PLAYER_TWO", name="playerix")),
            nullable=False,
        ),
        sa.ForeignKeyConstraint(
            ["game_id"],
            ["games.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.add_column(
        "games", sa.Column("winning_player_id", sa.BigInteger(), nullable=True)
    )
    op.add_column(
        "games", sa.Column("created_at", sa.DateTime(timezone=True), nullable=False)
    )
    op.drop_column("games", "winner")


def downgrade():
    op.add_column(
        "games",
        sa.Column(
            "winner", sa.VARCHAR(length=100), autoincrement=False, nullable=False
        ),
    )
    op.drop_column("games", "created_at")
    op.drop_column("games", "winning_player_id")
    op.drop_table("boards")
