import random
from tic_tac_toe_api.game import Player


def make_pin():
    return str(random.randint(1000, 9999))


def calculate_next_turn(board):
    num_of_placed_slots = sum(slot != Player.EMPTY for slot in board.slots)
    if num_of_placed_slots % 2:
        return Player.TWO
    else:
        return Player.ONE
