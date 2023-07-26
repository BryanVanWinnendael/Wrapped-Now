# Wrapped Now Client

To run the client first install the dependencies:

```bash
npm install
```

Create a `.env.local` file with the following content:

```bash
NEXT_PUBLIC_API_URL=***
NEXT_PUBLIC_REDIRECT_URL=***
NEXT_PUBLIC_CLIENT_ID=***
```

The api url should be the url where the server is hosted on.
The redirect url should be the url where the client is hosted on.
For the client id you can get this from the [spotify developer dashboard](https://developer.spotify.com/).

Then run the client:

```bash
npm run dev
```

## Deployment

For deployment I recommend using [Vercel](https://vercel.com/docs).
