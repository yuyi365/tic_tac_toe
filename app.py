from fastapi import FastAPI

app = FastAPI()


@app.get("/board")
async def board():
    return {"board": "[1, 2, 3, 4, 5, 6, 7, 8, 9]"}
