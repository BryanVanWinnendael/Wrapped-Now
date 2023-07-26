from fastapi import APIRouter
from fastapi.params import Depends

from scripts.profile import get_profile
from utils.bearerToken import get_bearer_token

router = APIRouter()


@router.get("")
async def get_profile_from_user(token: str = Depends(get_bearer_token)):
    return get_profile(token)