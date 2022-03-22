import pytest

from tic_tac_toe_api.game import (
    BoardResponse,
    Board,
    EMPTY_TOKEN,
    InvalidBoardIndex,
    SpotUnavailableError,
)


@pytest.fixture()
def empty_board():
    return Board(slots=[EMPTY_TOKEN] * 9)


def test_if_board_can_accept_token(empty_board):
    board = empty_board
    expected_board = Board(slots=["X", "-", "-", "-", "-", "-", "-", "-", "-"])

    board.place_slot(0)

    assert board == expected_board


def test_placing_token_on_board_with_existing_token_raises_spot_unavailable():
    board = Board(slots=["X", "-", "-", "-", "-", "-", "-", "-", "-"])

    with pytest.raises(SpotUnavailableError):
        board.place_slot(0)


@pytest.mark.parametrize("slot_index", [-1, 9, "a"])
def test_placing_invalid_slot_index(slot_index, empty_board):
    with pytest.raises(InvalidBoardIndex):
        empty_board.place_slot(slot_index)
