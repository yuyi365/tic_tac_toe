from app import Board


def test_empty_board_has_first_spot_available():
    board = Board(slots=["-", "-", "-", "-", "-", "-", "-", "-", "-"])

    result = board.check_avail(0)

    assert result


def test_board_with_existing_token():
    board = Board(slots=["X", "-", "-", "-", "-", "-", "-", "-", "-"])

    result = board.check_avail(0)

    assert result != True
