import requests


def get_top_artists(token: str, limit: int, time_range: str):
    """Get the top songs from the user"""
    response = requests.get(
        "https://api.spotify.com/v1/me/top/artists?limit=" + str(limit) + "&time_range=" + time_range,
        headers={
            "Authorization": f"Bearer {token}"
        }
    )
    return response.json()