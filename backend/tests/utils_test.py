from tic_tac_toe_api.utils import make_pin


def test_output_of_make_pin_to_be_a_string():
    result = make_pin()
    result_converted_to_a_string = str(result)
    assert result == result_converted_to_a_string


def test_output_of_make_pin_to_not_be_a_number():
    result = make_pin()
    result_converted_to_integer = int(result)
    assert result != result_converted_to_integer


def test_output_of_make_pin_to_be_a_random_number_between_1000_and_9999_and_not_a_decimal():
    result = make_pin()
    assert result != "2"
    assert result != "00000"
    assert result != "1234.25"
