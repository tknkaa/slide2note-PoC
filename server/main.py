from fastapi import FastAPI, UploadFile
from llm import get_gemini_response
import os

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/slide")
async def create_slide(file: UploadFile):
    content = await file.read()
    with open("example.pdf", "wb") as f:
        f.write(content)
    response = get_gemini_response("example.pdf")
    os.remove("example.pdf")
    return {"filename": file.filename, "response": response}
