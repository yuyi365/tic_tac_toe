.PHONY: all client

all: frontend/openapi.json client

frontend/openapi.json: backend/tic_tac_toe_api/api.py
	cd backend && pipenv run generate-openapi > $(abspath $@)

client: frontend/openapi.json
	cd frontend && npm run generate-client