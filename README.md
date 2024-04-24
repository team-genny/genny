# Genny
**A RESTful API for generating dummy data against a schema.**

## Configuring:
Genny can be configured using the following environment variables. `.env` files are supported.

| name | default | description |
| ---- | ------- | ----------- |
| `MONGODB_URI` | `mongodb://localhost:27017/genny` | The connection URI for the MongoDB server |
| `PORT` | `8080` | The port for the API to listen on. |

## Development

### Get the Code:
```sh
git clone https://github.com/TSI-Training-Team/genny
```

### Install Dependencies:
```sh
cd genny
npm install
```

### Run for Development:
For development, it's recommended to run the API and frontend independently, to benefit the most from the Vite dev server.
```sh
npm run api:dev
# Then, in a separate terminal window:
npm run fe:dev
```

Or to run both in the same terminal session concurrently:
```sh
npm run dev
```

## Build & Run for Production
```sh
npm ci
npm run build
npm start
```
