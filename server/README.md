# Wrapped Now Server

To run the server first install the dependencies:

```bash
pip install -r requirements.txt
```

````

Create a `.env` file with the following content:

```bash
ORIGIN=***
````

The origin should be the url where the client is hosted on.

Then run the server:

```bash
uvicorn main:app --reload
```
