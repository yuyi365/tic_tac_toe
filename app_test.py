from fastapi.testclient import TestClient

from app import make_empty_board, app

client = TestClient(app)


def test_valid_board_endpoint():
    expected_status_code = 200

    response = client.get("/board")

    assert response.status_code == expected_status_code


def test_empty_board_contents():
    expected_content = make_empty_board()

    response = client.get("/board")

    assert response.json() == expected_content.dict()
