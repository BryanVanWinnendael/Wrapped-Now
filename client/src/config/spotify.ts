const authEndpoint = "https://accounts.spotify.com/authorize"
const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URL
const clientId = process.env.NEXT_PUBLIC_CLIENT_ID

const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
]

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`
