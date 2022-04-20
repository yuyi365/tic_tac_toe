import pytest
from fastapi.testclient import TestClient

from tic_tac_toe_api.api import app
from tic_tac_toe_api.models import BoardResponse
from tic_tac_toe_api.game import Player, make_default_tokens


@pytest.fixture()
def client():
    with TestClient(app) as client:
        yield client


@pytest.fixture()
def default_tokens():
    return make_default_tokens()


def test_valid_board_endpoint(client):
    expected_status_code = 200

    response = client.get("/board")

    assert response.status_code == expected_status_code


def test_empty_board_content(client, default_tokens):
    empty_token = default_tokens[None]
    expected_content = BoardResponse(slots=[empty_token] * 9)

    response = client.get("/board")

    assert response.json() == expected_content.dict()


def test_valid_move_endpoint(client):
    expected_status = 200

    response = client.post(
        "/makemove",
        json={"slot_index": 1, "player": Player.ONE.value},
    )

    assert response.status_code == expected_status


def test_post_response_content(client, default_tokens):
    empty_token = default_tokens[None]
    player_one_token = default_tokens[Player.ONE]

    expected_board = BoardResponse(slots=[player_one_token] + [empty_token] * 8)

    response = client.post(
        "/makemove",
        json={"slot_index": 0, "player": Player.ONE.value},
    )

    assert response.json() == expected_board.dict()


def test_post_response_content_index_out_of_range(client):
    expected_content = {"detail": "Invalid entry - slot index must be between 0 and 8"}

    response = client.post(
        "/makemove",
        json={"slot_index": 11, "player": Player.TWO.value},
    )

    assert response.json() == expected_content


def test_post_response_slot_already_exists(client):
    expected_content = {"detail": "Spot already taken"}

    client.post(
        "/makemove",
        json={"slot_index": 2, "player": Player.ONE.value},
    )

    response = client.post(
        "/makemove",
        json={"slot_index": 2, "player": Player.TWO.value},
    )

    assert response.json() == expected_content


def test_post_response_type_error_unprocessable_entity(client):
    expected_status = 422

    response = client.post(
        "/makemove",
        json={"not_slot_index_int": "🧇", "not_a_token_str": 5},
    )

    assert response.status_code == expected_status
