import os
import sqlalchemy


engine = sqlalchemy.create_engine(os.getenv("SQLALCHEMY_CONN"))


def create_engine():
    return sqlalchemy.create_engine(os.getenv("SQLALCHEMY_CONN"))
