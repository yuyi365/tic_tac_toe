from tic_tac_toe_api.service import create_new_game
from tic_tac_toe_api.tables import games
from sqlalchemy.sql import select


def test_return_value_pin_to_be_in_the_pin_of_initial_pin_input(db_conn):
    new_game_result = create_new_game(db_conn)
    stmt = select(games)
    result = db_conn.execute(stmt).first()
    assert result.pin == new_game_result["pin"]


def test_return_posts_to_the_database_and_returns_a_valid_integer_game_id(db_conn):
    new_game_result = create_new_game(db_conn)
    assert new_game_result["game_id"] != 0
