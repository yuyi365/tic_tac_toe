#!/usr/bin/env python
"""Prints the OpenAPI schema for the Tic Tac Toe API to stdout."""
import json
import pathlib
import sys

# Add tic_tac_toe_api/backend to PYTHONPATH
TIC_TAC_TOE_BACKEND_DIR = pathlib.Path(__file__).parents[1]
sys.path.insert(0, str(TIC_TAC_TOE_BACKEND_DIR))

from tic_tac_toe_api.api import app  # noqa

print(json.dumps(app.openapi(), indent=2))
