import pytest

from tic_tac_toe_api.mappers import map_board_response
from tic_tac_toe_api.api import BoardResponse
from tic_tac_toe_api.game import Board, make_default_tokens, make_empty_board, Player


@pytest.fixture
def default_tokens():
    return make_default_tokens()


def test_board_mapper_response_with_empty_board(default_tokens):
    board = make_empty_board()
    empty_token = default_tokens[None]
    expected_board = BoardResponse(slots=[empty_token] * 9)

    response = map_board_response(board, default_tokens)

    assert response == expected_board


def test_board_mapper_response_with_non_empty_board(default_tokens):
    board = Board(slots=[Player.ONE] + [None] * 8)

    player_one_token = default_tokens[Player.ONE]
    empty_token = default_tokens[None]

    expected_board = BoardResponse(slots=[player_one_token] + [empty_token] * 8)

    response = map_board_response(board, default_tokens)

    assert response == expected_board
