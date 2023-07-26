from fastapi import APIRouter
from fastapi.params import Depends

from scripts.songs import get_playing_song, get_top_songs
from utils.bearerToken import get_bearer_token

router = APIRouter()


@router.get("/top")
async def get_top_songs_from_user(token: str = Depends(get_bearer_token), limit: int = 20, time_range: str = "long_term"):
    return get_top_songs(token, limit, time_range)

@router.get("/playing")
async def get_playing_song_from_user(token: str = Depends(get_bearer_token)):
    return get_playing_song(token)