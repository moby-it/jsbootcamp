import express from 'express';

import path from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();

const port = 3000;


app.get('/console.js', (req, res) => {
  res.sendFile('console.js', { root: __dirname });
});

app.get('/', (req, res) => {
  res.sendFile('box.html', { root: __dirname });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});