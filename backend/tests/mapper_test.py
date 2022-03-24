from tic_tac_toe_api.mappers import map_board_response
from tic_tac_toe_api.api import BoardResponse
from tic_tac_toe_api.game import Board, EMPTY_TOKEN, PLAYER_ONE_TOKEN


def test_board_mapper_response_with_empty_board():
board = Board(slots=[EMPTY_TOKEN] * 9)
    expected_board = BoardResponse(slots=[EMPTY_TOKEN] * 9)

    response = map_board_response(board)

    assert response == expected_board


def test_board_mapper_response_with_none_empty_board():

    expected_board = BoardResponse(slots=[PLAYER_ONE_TOKEN] + [EMPTY_TOKEN] * 8)

    response = map_board_response(expected_board)

    assert response == expected_board
