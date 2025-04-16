from fastapi import FastAPI
from .config import settings
from routers import auth # Import the auth router

app = FastAPI()

# Include the auth router
app.include_router(auth.router)

@app.get("/")
def read_root():
    return {'message': 'ShareYourSpace 2.0 Backend'}
