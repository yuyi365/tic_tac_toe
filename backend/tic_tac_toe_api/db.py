import os
import sqlalchemy


def create_engine() -> sqlalchemy.engine.Engine:
    return sqlalchemy.create_engine(os.getenv("SQLALCHEMY_CONN"))