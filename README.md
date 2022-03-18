# Tic-Tac-Toe Game

![Build Status](https://github.com/yuyi365/tic_tac_toe_api/actions/workflows/build_api.yml/badge.svg)
![Build Status](https://github.com/yuyi365/tic_tac_toe_api/actions/workflows/build_frontend.yml/badge.svg)

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

5. Pipenv (package manager) 🐍
```bash
pip install pipenv
```

6. All dependencies via pipenv 📦
```bash
pipenv install --dev
```

7. Launch server
```bash
uvicorn --port 3000 tic_tac_toe_api.api:app --reload
```

## Installation - Frontend
*please make sure that you are in the `frontend` directory*

1. Install node 💻
```bash
brew install node
```

2. All dependencies via npm 📦
```bash
npm install
```

3. Launch server
```bash
npm start
```

## Usage
- View all endpoints via FastAPI docs 📝
```
[localhost]/docs
```

