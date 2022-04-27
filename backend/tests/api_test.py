import pytest
from unittest import mock
from fastapi.testclient import TestClient
from tic_tac_toe_api.api import app
from tic_tac_toe_api.models import BoardResponse
from tic_tac_toe_api.game import Player, make_empty_board
from tic_tac_toe_api.repository import (
    insert_game,
    insert_settings,
    insert_board,
    retrieve_board,
)


@pytest.fixture()
def client(db_engine):
    with mock.patch("tic_tac_toe_api.api.create_engine") as mock_create_engine:
        mock_create_engine.return_value = db_engine
        with TestClient(app) as client:
            yield client


def set_up_game_and_settings(db_conn):
    game_id = insert_game(db_conn, "1234")
    insert_settings(
        db_conn,
        game_id,
        player_one_token="🦄",
        player_two_token="🍄",
    )
    db_conn.commit()
    return game_id


def set_up_game_settings_and_board(db_conn):
    game_id = insert_game(db_conn, "1234")
    insert_settings(
        db_conn,
        game_id,
        player_one_token="🦄",
        player_two_token="🍄",
    )
    empty_board = make_empty_board()
    insert_board(db_conn, game_id, empty_board.slots)
    db_conn.commit()
    return game_id


def test_get_board_valid_endpoint(client, db_conn):

    expected_status_code = 200

    game_id = set_up_game_settings_and_board(db_conn)
    response = client.get(f"/games/{game_id}/board")

    assert response.status_code == expected_status_code


def test_get_board_empty_board_content(client, db_conn):
    expected_content = BoardResponse(slots=[""] * 9)

    game_id = set_up_game_settings_and_board(db_conn)
    response = client.get(f"/games/{game_id}/board")

    assert response.json() == expected_content.dict()


def test_post_move_valid_endpoint(client, db_conn):

    expected_status = 201

    game_id = set_up_game_and_settings(db_conn)

    response = client.post(
        f"/games/{game_id}/move",
        json={
            "slot_index": 0,
            "player": Player.ONE.value,
        },
    )

    assert response.status_code == expected_status


def test_post_move_response_content(client, db_conn):

    game_id = set_up_game_and_settings(db_conn)

    client.post(
        f"/games/{game_id}/move",
        json={
            "slot_index": 0,
            "player": Player.ONE.value,
        },
    )

    results = retrieve_board(db_conn, game_id)

    assert results == [Player.ONE] + [Player.EMPTY] * 8


def test_post_move_response_slots_index_out_of_range(client, db_conn):

    game_id = set_up_game_and_settings(db_conn)

    expected_content = {"detail": "Invalid entry - slot index must be between 0 and 8"}

    response = client.post(
        f"/games/{game_id}/move",
        json={"slot_index": 11, "player": Player.TWO.value},
    )

    assert response.json() == expected_content


def test_post_move_response_slot_already_exists(client, db_conn):

    game_id = set_up_game_and_settings(db_conn)

    expected_content = {"detail": "Spot already taken"}

    client.post(
        f"/games/{game_id}/move",
        json={"slot_index": 2, "player": Player.ONE.value},
    )

    response = client.post(
        f"/games/{game_id}/move",
        json={"slot_index": 2, "player": Player.TWO.value},
    )

    assert response.json() == expected_content


def test_post_move_response_type_error_unprocessable_entity(client, db_conn):

    expected_status = 422

    response = client.post(
        "/games/10/move",
        json={
            "not_a_game_id": "👑",
            "not_slot_index_int": "🧇",
            "not_a_token_str": 5,
        },
    )

    assert response.status_code == expected_status


def test_post_new_game_endpoint(client, db_conn):

    expected_status = 200

    response = client.post("/newgame")

    assert response.status_code == expected_status


def test_post_settings_valid_endpoint(client, db_conn):

    game_id = insert_game(db_conn, "1234")
    db_conn.commit()

    expected_status = 201

    response = client.post(
        f"/games/{game_id}/settings",
        json={"player_one_token": "👑", "player_two_token": "🦩"},
    )

    assert response.status_code == expected_status


def test_post_settings_invalid_endpoint(client, db_conn):

    expected_status = 400

    response = client.post(
        "/games/10/settings",
        json={"player_one_token": "🦄", "player_two_token": "🍄"},
    )

    assert response.status_code == expected_status
