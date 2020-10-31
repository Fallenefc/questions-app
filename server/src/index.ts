import express from 'express';
import cors from 'cors';
import { mongooseConnection } from './database'
import router from './router'
import bodyParser from 'body-parser'
import { PORT } from './environment';

const app = express();

app.use(bodyParser.json())
app.use(cors())
app.use(router)

app.listen(PORT, (): void => {
  mongooseConnection();
  console.log(`Server running on http://localhost:${PORT}`)
});