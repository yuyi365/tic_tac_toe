from tic_tac_toe_api.utils import make_pin, calculate_next_turn
from tic_tac_toe_api.game import Board, Player


def test_output_of_make_pin_to_be_a_string():
    result = make_pin()
    assert type(result) == str


def test_output_of_make_pin_to_be_a_random_number_between_1000_and_9999():
    result = make_pin()
    assert int(result) > 1000 and int(result) < 9999


def test_next_turn_of_player_one_with_empty_board():
    board = Board(slots=[Player.EMPTY] * 9)
    result = calculate_next_turn(board)
    assert result == Player.ONE


def test_next_turn_of_player_one_with_two_placed_slots():
    board = Board(slots=[Player.ONE] + [Player.TWO] + [Player.EMPTY] * 7)
    result = calculate_next_turn(board)
    assert result == Player.ONE


def test_next_turn_of_player_two_with_one_placed_slots():
    board = Board(slots=[Player.ONE] + [Player.EMPTY] * 8)
    result = calculate_next_turn(board)
    assert result == Player.TWO
