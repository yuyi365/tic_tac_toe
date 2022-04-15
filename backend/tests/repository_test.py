from tic_tac_toe_api.repository import repository


def test_insert_game(db_conn):
    repository.insert_game(db_conn, "1000")

    result = db_conn.execute("select * from games").first()
    assert result.pin == "1000"
    assert result.id == 1
