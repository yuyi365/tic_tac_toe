import pytest
import os
import sqlalchemy
from tic_tac_toe_api.tables import metadata


@pytest.fixture(scope="class")
def db_engine():
    engine = sqlalchemy.create_engine(os.environ["TEST_SQLALCHEMY_CONN"], echo=False)
    metadata.create_all(engine)
    yield engine
    metadata.drop_all(engine)


@pytest.fixture(scope="class")
def db_conn(db_engine):
    with db_engine.connect() as conn:
        yield conn
        conn.rollback()
