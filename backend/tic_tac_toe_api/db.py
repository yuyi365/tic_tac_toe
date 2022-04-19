import os
import sqlalchemy


def create_engine() -> sqlalchemy.engine.Engine:
    return sqlalchemy.create_engine(os.getenv("SQLALCHEMY_CONN"))


def create_test_engine() -> sqlalchemy.engine.Engine:
    return sqlalchemy.create_engine(os.getenv("TEST_SQLALCHEMY_CONN"))
