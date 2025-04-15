from fastapi import FastAPI
from .config import settings

app = FastAPI()

@app.get("/")
def read_root():
    return {'message': 'ShareYourSpace 2.0 Backend'}
