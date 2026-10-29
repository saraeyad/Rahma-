# Rahma

A hospital management app. The API is in `server`. Sprint screens are in `client`.

## API

    cd server
    npm install
    cp .env.example .env
    npm run dev

Check style with `npm run lint` and `npm run format:check`.

## Frontend

Sprint 0 calls `GET /health`.

    cd client
    npm install
    npm run dev

Open http://localhost:5173 while the API is running.

## Endpoints

- `GET /health` returns `{ "status": "ok" }`

## Contributors

- [Sara Eyad](https://github.com/saraeyad)
