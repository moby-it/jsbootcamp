import express from 'express';
import { pokedexRouter } from './pokemon.js';
import { registerMiddleware } from './middleware.js';
import { configDotenv } from 'dotenv';
import { authRouter } from './auth.js';
import { connectToDb, seedDatabase } from './db.js';

configDotenv();

const app = express();
const port = 4000;

registerMiddleware(app);

await connectToDb();
await seedDatabase();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Routes
app.use("/pokemon", pokedexRouter);
app.use("/auth", authRouter);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});