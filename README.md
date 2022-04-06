# Tic-Tac-Toe Game

![API Build and Test](https://github.com/yuyi365/tic_tac_toe_api/actions/workflows/build_api.yml/badge.svg)
![Frontend Build and Test](https://github.com/yuyi365/tic_tac_toe_api/actions/workflows/build_frontend.yml/badge.svg)

👾 A tic-tac-toe web application that connects to a custom API.

## Features
- TBD

## Installation - API

1. [Homebrew](https://brew.sh/) 🍺
```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

2. Python3 🐍
```bash
brew install python
```

3. Pyenv 🐍
```bash
brew install pyenv
```
- Configure the `pyenv` PATH (macOS reference below)
```bash
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.zshrc
echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.zshrc
echo 'eval "$(pyenv init -)"' >> ~/.zshrc
```
- Install the required version of python
```
pyenv install 3.8.12
```

4. Pipenv (package manager) 🐍
```bash
pip install pipenv
```

5. All dependencies via pipenv 📦
*please make sure that you are in the `backend` directory*

```bash
pipenv install --dev
```

6. Run the tests
```bash
pipenv run pytest
```

## Installation - Frontend
*please make sure that you are in the `frontend` directory*

1. Install node 💻
```bash
brew install node
```

2. All dependencies via npm 📦
```bash
npm install --include=dev
```

3. OpenAPI client files 📦
```bash
npm run generate-client
```

4. Run the tests
```bash
npm run test
```

## Usage

1. Run the backend server in development mode
```bash
cd backend
pipenv run start
```

2. Run a server for frontend development
```bash
cd frontend
npm start
```

## Development

Generate the OpenAPI schema and frontend client

```bash
make
```
