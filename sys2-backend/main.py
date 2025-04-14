from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {'message': 'ShareYourSpace 2.0 Backend'}
