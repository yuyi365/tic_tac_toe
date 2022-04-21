from tic_tac_toe_api.repository import insert_game, insert_settings
from tic_tac_toe_api.tables import games, settings
from tic_tac_toe_api.game import Player, make_default_tokens
from sqlalchemy.sql import select


def test_insert_game_with_valid_pin(db_conn):
    insert_game(db_conn, "4765")
    results = db_conn.execute(select(games)).fetchall()
    assert len(results) == 1
    assert results[0].pin == "4765"


def test_insert_settings_with_valid_game_id(db_conn):
    make_default_tokens()
    insert_game(db_conn, "4765")
    insert_settings(db_conn, 1, Player.ONE, Player.TWO)
    results = db_conn.execute(select(settings)).fetchall()
    assert len(results) == 1
    assert results[0].game_id == 1
    assert results[0].player_one_token == Player.ONE
    assert results[0].player_two_token == Player.TWO
