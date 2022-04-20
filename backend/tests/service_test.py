import pytest
from tic_tac_toe_api.service import (
    create_new_game,
    save_game_settings,
    manipulate_board,
    get_board,
)
from tic_tac_toe_api.game import make_empty_board, Player
from tic_tac_toe_api.tables import games, settings
from tic_tac_toe_api.repository import retrieve_board
from sqlalchemy.sql import select
from unittest.mock import patch


@pytest.fixture()
def empty_board():
    return make_empty_board()


def set_up_game(db_conn):
    new_game = create_new_game(db_conn)
    save_game_settings(db_conn, new_game["game_id"], "🦄", "🍄")
    return new_game["game_id"]


def test_return_value_pin_is_equal_to_initial_pin_input(db_conn):
    result = create_new_game(db_conn)
    expected = db_conn.execute(select(games.c.id, games.c.pin)).first()
    assert result == {"pin": expected.pin, "game_id": expected.id}


@patch("tic_tac_toe_api.service.make_pin")
def test_service_handles_pin_already_exists(mock_make_pin, db_conn):
    first_pin = "1000"
    second_pin = "1234"
    db_conn.execute(games.insert().values(pin=first_pin))
    mock_make_pin.side_effect = [first_pin, second_pin]

    new_game_result = create_new_game(db_conn)
    assert new_game_result["pin"] == second_pin


def test_create_new_game_and_save_game_settings_with_valid_game_id(db_conn):
    game_id = set_up_game(db_conn)
    data = db_conn.execute(select(settings)).first()
    assert data.game_id == game_id
    assert data.player_one_token == "🦄"
    assert data.player_two_token == "🍄"


def test_manipulate_board(db_conn):
    game_id = set_up_game(db_conn)
    expected_result = [Player.ONE] + [Player.EMPTY] * 8

    manipulate_board(db_conn, game_id, 0, Player.ONE)

    results = retrieve_board(db_conn, game_id)
    assert results == expected_result


def test_get_board(db_conn):
    set_up_game(db_conn)
    expected_result = [Player.EMPTY] * 9

    results = get_board(db_conn, 1)
    assert results["board"].slots == expected_result
