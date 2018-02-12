import express  from 'express';
import bodyParser from 'body-parser';

import ApiRouter from './controllers/api';

const app = express();

app.use(bodyParser.json());

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
