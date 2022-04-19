from tic_tac_toe_api.repository import insert_game
from tic_tac_toe_api.tables import games
from sqlalchemy.sql import select


def test_insert_game_with_valid_pin(db_conn):
    insert_game(db_conn, "4765")
    query = select(games)
    result = db_conn.execute(query).first()
    assert result.pin == "4765"
    assert result.id == 1


def test_insert_game_with_invalid_pin_string_length(db_conn):
    insert_game(db_conn, "123456")
    query = select(games)
    result = db_conn.execute(query).first()
    assert result is None
