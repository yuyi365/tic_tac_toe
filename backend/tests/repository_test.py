from tic_tac_toe_api.repository import insert_game
from tic_tac_toe_api.tables import games
from sqlalchemy.sql import select


def test_insert_game_with_valid_pin(db_conn):
    insert_game(db_conn, "4765")
    results = db_conn.execute(select(games)).fetchall()
    assert len(results) == 1
    assert results[0].pin == "4765"
