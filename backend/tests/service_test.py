from tic_tac_toe_api.service import create_new_game
from tic_tac_toe_api.tables import games
from sqlalchemy.sql import select
from unittest.mock import patch


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
