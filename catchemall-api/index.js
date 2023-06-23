import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { pokedexRouter } from './pokemon.js';
const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json({ type: 'application/json' }));



app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use("/pokemon", pokedexRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});