import pytest

from tic_tac_toe_api.api import BoardResponse
from tic_tac_toe_api.game import Board, Player, make_default_tokens, make_empty_board
from tic_tac_toe_api.mappers import map_board_response


@pytest.fixture
def default_tokens():
    return make_default_tokens()


def test_board_mapper_response_with_empty_board(default_tokens):
    board = make_empty_board()
    empty_token = default_tokens[Player.EMPTY]
    expected_response = BoardResponse(
        slots=[empty_token] * 9, next_turn=Player.ONE, next_turn_token="🦄"
    )

    response = map_board_response(board, default_tokens, Player.ONE)

    assert response == expected_response


def test_board_mapper_response_with_non_empty_board(default_tokens):
    board = Board(slots=[Player.ONE] + [Player.EMPTY] * 8)

    player_one_token = default_tokens[Player.ONE]
    empty_token = default_tokens[Player.EMPTY]

    expected_response = BoardResponse(
        slots=[player_one_token] + [empty_token] * 8,
        next_turn=Player.TWO,
        next_turn_token="🍄",
    )

    response = map_board_response(board, default_tokens, Player.TWO)

    assert response == expected_response
