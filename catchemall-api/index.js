import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json({ type: 'application/json' }));

const pokemonCaught = [];

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post("/catch", (req, res) => {
  console.log(req.body);
  res.send(JSON.stringify(req.body));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});