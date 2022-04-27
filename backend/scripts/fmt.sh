#!/usr/bin/env bash
set -x
autoflake --remove-all-unused-imports --recursive --in-place .
isort .
black .