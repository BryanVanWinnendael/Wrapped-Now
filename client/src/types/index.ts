export type AuthObj = {
  access_token: string
  expires_in: string
  token_type: string
}

export type AuthContext = {
  token: string | null
  setToken: (token: string | null) => void
}

export type TimeContext = {
  time: string
  setTime: (token: string) => void
}

export type SpotifyProfile = {
  display_name: string
  email: string
  external_urls: {
    spotify: string
  }
  followers: {
    href: string | null
    total: number
  }
  href: string
  id: string
  images: {
    height: number | null
    url: string
    width: number | null
  }[]
  product: string
  type: string
  uri: string
  error?: {
    status: number
    message: string
  }
}

export type CurrentlyPlaying = {
  progress_ms: number
  is_playing: boolean
  item: {
    duration_ms: number
    album: {
      album_type: string
      artists: {
        external_urls: {
          spotify: string
        }
        href: string
        id: string
        name: string
        type: string
        uri: string
      }[]
      external_urls: {
        spotify: string
      }
      images: {
        height: number
        url: string
        width: number
      }[]
      name: string
    }
    artists: {
      name: string
      external_urls: {
        spotify: string
      }
    }[]
    external_urls: {
      spotify: string
    }
    name: string
  }
}

export type TopSongs = {
  items: {
    album: {
      album_type: string
      artists: {
        external_urls: {
          spotify: string
        }
        href: string
        id: string
        name: string
        type: string
        uri: string
      }[]
      external_urls: {
        spotify: string
      }
      images: {
        height: number
        url: string
        width: number
      }[]
      name: string
    }
    artists: {
      name: string
      external_urls: {
        spotify: string
      }
    }[]
    genres: string[]
    external_urls: {
      spotify: string
    }
    name: string
  }[]
}

export type TopArtists = {
  items: {
    external_urls: {
      spotify: string
    }
    followers: {
      href: string | null
      total: number
    }
    genres: string[]
    href: string
    id: string
    images: {
      height: number | null
      url: string
      width: number | null
    }[]
    name: string
    popularity: number
    type: string
    uri: string
  }[]
  error?: {
    status: number
    message: string
  }
}
