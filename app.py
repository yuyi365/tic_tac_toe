from fastapi import FastAPI

app = FastAPI()


@app.get("/board")
def home():
    return {"Board": "Testing"}
