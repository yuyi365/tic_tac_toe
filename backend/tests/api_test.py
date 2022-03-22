import pytest
from fastapi.testclient import TestClient

from tic_tac_toe_api.api import app
from tic_tac_toe_api.game import Board, EMPTY_TOKEN, PLAYER_ONE_TOKEN


@pytest.fixture()
def client():
    with TestClient(app) as client:
        yield client


def test_valid_board_endpoint(client):
    expected_status_code = 200

    response = client.get("/board")

    assert response.status_code == expected_status_code


def test_empty_board_content(client):
    expected_content = Board(slots=[EMPTY_TOKEN] * 9)

    response = client.get("/board")

    assert response.json() == expected_content.dict()


def test_valid_move_endpoint(client):
    expected_status = 200

    response = client.post(
        "/move",
        json={"slot_index": 1},
    )

    assert response.status_code == expected_status


def test_post_response_content(client):
    expected_board = Board(slots=[PLAYER_ONE_TOKEN] + [EMPTY_TOKEN] * 8)

    response = client.post(
        "/move",
        json={"slot_index": 0},
    )

    assert response.json() == expected_board.dict()


def test_post_response_content_index_out_of_range(client):
    expected_content = {"detail": "Invalid entry - slot index must be between 0 and 8"}

    response = client.post(
        "/move",
        json={"slot_index": 11},
    )

    assert response.json() == expected_content


def test_post_response_slot_already_exists(client):

    expected_content = {"detail": "Spot already taken"}

    client.post(
        "/move",
        json={"slot_index": 2},
    )

    response = client.post(
        "/move",
        json={"slot_index": 2},
    )

    assert response.json() == expected_content
