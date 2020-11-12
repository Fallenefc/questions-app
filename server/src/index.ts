import express from 'express';
import cors from 'cors';
import { mongooseConnection } from './database'
import router from './router'
import bodyParser from 'body-parser'
import { PORT } from './environment'

const app = express();

const corsConfig = {
  origin: 'http://localhost:3000',
  credentials: true
}

app.use(bodyParser.json())
app.use(cors(corsConfig))
app.use(router)

const server = app.listen(PORT, (): void => {
  mongooseConnection();
  console.log(`Server running on http://localhost:${PORT}`)
});

module.exports = server;