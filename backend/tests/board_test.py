import pytest

from tic_tac_toe_api.game import (
    Board,
    Player,
    make_empty_board,
    InvalidBoardIndex,
    SpotUnavailableError,
)


@pytest.fixture()
def empty_board():
    return make_empty_board()


def test_if_board_can_accept_token(empty_board):
    board = empty_board
    expected_board = Board(slots=[Player.ONE] + [None] * 8)

    board.place_slot(0, Player.ONE)

    assert board == expected_board


def test_placing_token_on_board_with_existing_token_raises_spot_unavailable():
    board = Board(slots=[Player.ONE] + [None] * 8)

    with pytest.raises(SpotUnavailableError):
        board.place_slot(0, Player.ONE)


@pytest.mark.parametrize("slot_index", [-1, 9, "a"])
def test_placing_invalid_slot_index(slot_index, empty_board):
    with pytest.raises(InvalidBoardIndex):
        empty_board.place_slot(slot_index, Player.ONE)
