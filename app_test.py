import pytest
from fastapi.testclient import TestClient

from app import BOARD, Board, app

client = TestClient(app)


@pytest.fixture()
def empty_board():
    return Board(slots=["-", "-", "-", "-", "-", "-", "-", "-", "-"])


def test_valid_board_endpoint():
    expected_status_code = 200

    response = client.get("/board")

    assert response.status_code == expected_status_code


def test_empty_board_content():

    expected_content = Board(slots=["-", "-", "-", "-", "-", "-", "-", "-", "-"])

    response = client.get("/board")

    assert response.json() == expected_content.dict()


def test_valid_move_endpoint():

    expected_status = 200

    response = client.post(
        "/move",
        json={"slot_index": 1},
    )

    assert response.status_code == expected_status


def test_post_response_content():

    expected_board = Board(slots=["X", "-", "-", "-", "-", "-", "-", "-", "-"])

    response = client.post(
        "/move",
        json={"slot_index": 0},
    )

    assert response.json() == expected_board.dict()


def test_post_response_content_index_out_of_range():

    expected_content = {"Invalid entry"}

    response = client.post(
        "/move",
        json={"slot_index": 11},
    )

    assert response.json() == expected_content
