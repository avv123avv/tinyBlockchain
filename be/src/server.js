import express  from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import ApiRouter from './controllers/api';

const app = express();

app.use(bodyParser.json());

app.use(cors({
  origin:['http://localhost:3007'],
  methods:['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});

app.use('/', ApiRouter);

const PORT = process.env.PORT || 3006;

app.listen(PORT, () => {
  console.log(`Server listening on: ${PORT}`);
});
