from tic_tac_toe_api.repository import insert_game
from tic_tac_toe_api.tables import games
from sqlalchemy.sql import select


def test_insert_game_with_valid_pin(db_conn):
    insert_game(db_conn, "4765")
    stmt = select(games)
    result = db_conn.execute(stmt).first()
    assert result.pin == "4765"
    assert result.id == 1


def test_insert_game_with_invalid_pin_type(db_conn):
    insert_game(db_conn, 0)
    stmt = select(games)
    result = db_conn.execute(stmt).first()
    assert result.pin != 0
