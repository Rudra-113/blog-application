# SimpleBlog — Frontend connected to Node.js + Express

This is the original SimpleBlog frontend, now connected to the backend REST APIs.

## Backend API used

- `POST /api/auth/register` — create a user
- `POST /api/auth/login` — log in and receive a JWT token
- `POST /api/blogs` — create a blog (JWT required)
- `GET /api/blogs` — load blog posts

The frontend expects the backend at:

`http://localhost:5000`

## How to run

1. Start the Node.js/Express backend first.
2. Make sure MongoDB is running.
3. Start this frontend with a local server, for example:

```bash
python -m http.server 8000
```

4. Open:

`http://localhost:8000`

## Authentication

After login/register, the JWT token is stored in browser `localStorage` and automatically sent as:

`Authorization: Bearer <token>`

This is a learning project. Do not use this storage approach as a production security design.
