import express from 'express';
import cors from 'cors';
import { mongooseConnection } from './database'
import router from './router'
import bodyParser from 'body-parser'
import { FRONTEND_URL, PORT, SERVER_URL } from './environment'

const app = express();

const corsConfig = {
  origin: FRONTEND_URL,
  credentials: true
}

app.use(bodyParser.json())
app.use(cors(corsConfig))
app.use(router)

const server = app.listen(PORT, (): void => {
  mongooseConnection();
  console.log(`Server running on ${SERVER_URL}`)
});

module.exports = server;