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


def test_if_board_can_accept_token(empty_board):

    board = empty_board
    expected_board = Board(slots=["X", "-", "-", "-", "-", "-", "-", "-", "-"])

    board.check_avail(0) == True
    board.place_slot(0, "X")

    assert board == expected_board
