import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from routers import artists, profile, songs

load_dotenv()
app = FastAPI()

origins = [os.environ.get("ORIGIN")]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    router=songs.router,
    prefix="/api/songs",
    tags=["songs"],
)

app.include_router(
    router=artists.router,
    prefix="/api/artists",
    tags=["artists"],
)

app.include_router(
    router=profile.router,
    prefix="/api/profile",
    tags=["profile"],
)

@app.get("/")
def read_root():
    """Redirect to Swagger UI when accessing the root endpoint"""
    return RedirectResponse("/docs")