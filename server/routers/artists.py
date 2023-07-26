from fastapi import APIRouter
from fastapi.params import Depends

from scripts.artists import get_top_artists
from utils.bearerToken import get_bearer_token

router = APIRouter()


@router.get("/top")
async def get_top_artists_from_user(token: str = Depends(get_bearer_token), limit: int = 20, time_range: str = "long_term"):
    return get_top_artists(token, limit, time_range)