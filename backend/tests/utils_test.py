from tic_tac_toe_api.utils import make_pin


def test_output_of_make_pin_to_be_a_string():
    result = make_pin()
    assert type(result) == str


def test_output_of_make_pin_to_be_a_random_number_between_1000_and_9999():
    result = make_pin()
    assert int(result) > 1000 and int(result) < 9999
