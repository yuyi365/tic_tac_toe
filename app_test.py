from fastapi.testclient import TestClient

from app import BOARD, make_empty_board, app

client = TestClient(app)


def test_valid_board_endpoint():
    expected_status_code = 200

    response = client.get("/board")

    assert response.status_code == expected_status_code


def test_empty_board_content():
    expected_content = make_empty_board()

    response = client.get("/board")

    assert response.json() == expected_content.dict()


def test_valid_move_endpoint():

    expected_status = 200

    response = client.post(
        "/move",
        headers={"X-Token": "playermove"},
        json={"slot": 1, "token": "X"},
    )

    assert response.status_code == expected_status


def test_post_response_content():

    expected_content = BOARD.place_slot(slot=1)

    response = client.post(
        "/move",
        headers={"X-Token": "playermove"},
        json={"slot": 1},
    )

    assert response.json() == expected_content.dict()
