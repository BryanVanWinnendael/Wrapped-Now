import requests


def get_top_songs(token: str, limit: int, time_range: str):
    response = requests.get(
        "https://api.spotify.com/v1/me/top/tracks?limit=" + str(limit) + "&time_range=" + time_range,
        headers={
            "Authorization": f"Bearer {token}"
        }
    )
    return response.json()

def get_playing_song(token: str):
    response = requests.get(
        "https://api.spotify.com/v1/me/player/currently-playing",
        headers={
            "Authorization": f"Bearer {token}"
        }
    )
    return response.json()