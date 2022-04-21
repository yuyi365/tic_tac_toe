from tic_tac_toe_api.service import create_new_game
from tic_tac_toe_api.repository import insert_game, insert_settings
from tic_tac_toe_api.tables import games, settings
from sqlalchemy.sql import select


def test_insert_game_with_valid_pin(db_conn):
    insert_game(db_conn, "4765")
    results = db_conn.execute(select(games)).fetchall()
    assert len(results) == 1
    assert results[0].pin == "4765"


def test_insert_settings_with_valid_game_id(db_conn):
    new_game = create_new_game(db_conn)
    results = insert_settings(db_conn, new_game["game_id"], "🦄", "🍄")
    data = db_conn.execute(select(settings)).fetchall()
    assert results == 1
    assert data[0].game_id == new_game["game_id"]
    assert data[0].player_one_token == "🦄"
    assert data[0].player_two_token == "🍄"
