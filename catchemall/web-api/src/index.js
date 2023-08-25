import { configDotenv } from 'dotenv';
import express from 'express';
import { authRouter } from './auth.js';
import { validateConfig } from './config.js';
import { createDbPool, seedDatabase } from './db.js';
import { registerMiddleware } from './middleware.js';
import { pokedexRouter } from './pokemon.js';
import { usersRouter } from './users.js';

configDotenv();

validateConfig();

const app = express();
const port = 4000;

registerMiddleware(app);

createDbPool();
await seedDatabase();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Routes
app.use("/pokemon", pokedexRouter);
app.use("/auth", authRouter);
app.use("/users", usersRouter);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
