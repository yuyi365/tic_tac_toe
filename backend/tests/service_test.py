import pytest
from tic_tac_toe_api.service import create_new_game, create_new_board
from tic_tac_toe_api.game import make_empty_board, Player, Board
from tic_tac_toe_api.tables import games
from sqlalchemy.sql import select
from unittest.mock import patch


@pytest.fixture()
def empty_board():
    return make_empty_board()


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


def test_creates_new_board(empty_board):
    board = empty_board
    slot_index = 0
    player = Player.ONE
    expected_board = Board(slots=[Player.ONE] + [None] * 8)
    new_board = create_new_board(board, slot_index, player)
    assert expected_board == new_board
