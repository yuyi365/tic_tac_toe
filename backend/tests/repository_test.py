from tic_tac_toe_api.repository import insert_game


def test_insert_game_with_valid_pin(db_conn):
    insert_game(db_conn, "4765")
    result = db_conn.execute("select * from games").first()
    assert result.pin == "4765"
    assert result.id == 1


def test_insert_game_with_invalid_pin_type(db_conn):
    insert_game(db_conn, 0)

    result = db_conn.execute("select * from games").first()
    assert result.pin != 0
