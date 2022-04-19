from tic_tac_toe_api.service import create_new_game
from tic_tac_toe_api.tables import games
from sqlalchemy.sql import select
from unittest.mock import patch


def test_return_value_pin_is_equal_to_initial_pin_input(db_conn):
    new_game_result = create_new_game(db_conn)
    query = select(games)
    result = db_conn.execute(query).first()
    assert result.pin == new_game_result["pin"]


def test_return_posts_to_the_database_and_returns_a_new_game(db_conn):
    new_game_result = create_new_game(db_conn)
    assert new_game_result is not None


@patch("tic_tac_toe_api.service.make_pin")
def test_service_handles_pin_already_exists(mock_make_pin, db_conn):
    first_pin = "1000"
    second_pin = "1234"
    db_conn.execute(games.insert().values(pin=first_pin))
    mock_make_pin.side_effect = [first_pin, second_pin]
    new_game_result = create_new_game(db_conn)
    assert new_game_result["pin"] != first_pin
    assert new_game_result["pin"] == second_pin
