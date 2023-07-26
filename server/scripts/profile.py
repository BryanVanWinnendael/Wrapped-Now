import requests


def get_profile(token: str):
    response = requests.get(
        "https://api.spotify.com/v1/me",
        headers={
            "Authorization": f"Bearer {token}"
        }
    )
    return response.json()