import pytest
from sqlalchemy.exc import DataError, IntegrityError
from tic_tac_toe_api.repository import (
    insert_game,
    insert_settings,
    retrieve_board,
    insert_board,
)
from tic_tac_toe_api.tables import games, settings
from sqlalchemy.sql import select
from tic_tac_toe_api.game import make_empty_board, Player, Board


def test_insert_game_with_valid_pin(db_conn):
    insert_game(db_conn, "4765")
    results = db_conn.execute(select(games)).fetchall()
    assert len(results) == 1
    assert results[0].pin == "4765"


def test_insert_game_with_invalid_pin(db_conn):
    with pytest.raises(DataError):
        insert_game(db_conn, "4765891")


def test_insert_settings_with_valid_game_id(db_conn):
    game_id = insert_game(db_conn, "1234")
    insert_settings(db_conn, game_id, "🦄", "🍄")
    data = db_conn.execute(select(settings)).fetchall()
    assert len(data) == 1
    assert data[0].game_id == game_id
    assert data[0].player_one_token == "🦄"
    assert data[0].player_two_token == "🍄"


def test_insert_settings_with_invalid_game_id(db_conn):
    with pytest.raises(IntegrityError):
        insert_settings(db_conn, 10, "🦄", "🍄")


def test_retrieve_board(db_conn):
    game_id = insert_game(db_conn, "1234")
    empty_board = make_empty_board()
    insert_board(db_conn, game_id, empty_board.slots)
    another_board = Board(slots=[Player.ONE] + [Player.EMPTY] * 8)
    insert_board(db_conn, game_id, another_board.slots)

    result = retrieve_board(db_conn, game_id)

    assert result == another_board.slots


def test_retrieve_board_when_there_is_no_board(db_conn):
    result = retrieve_board(db_conn, 1)
    assert result is None
