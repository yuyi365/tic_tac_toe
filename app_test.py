from fastapi.testclient import TestClient

from app import app

client = TestClient(app)


def test_read_board():
    response = client.get("/board")
    assert response.status_code == 200
    assert response.json() == {"board": "[1, 2, 3, 4, 5, 6, 7, 8, 9]"}


def test_smoke():
    assert True
