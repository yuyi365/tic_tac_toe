import pytest

from tic_tac_toe_api.game import Board, EMPTY_TOKEN


@pytest.fixture()
def empty_board():
    return Board(slots=[EMPTY_TOKEN] * 9)


def test_empty_board_has_first_spot_available(empty_board):
    board = empty_board

    result = board.check_avail(0)

    assert result


def test_board_with_existing_token():
    board = Board(slots=["X", "-", "-", "-", "-", "-", "-", "-", "-"])

    result = board.check_avail(0)

    assert result is not True