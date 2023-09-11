import { configDotenv } from 'dotenv';
import express from 'express';
import { authRouter } from './routes/auth.router.js';
import { validateConfig } from './config.js';
import { createDbPool, seedDatabase } from './db/db.js';
import { registerMiddleware } from './middleware/index.js';
import { pokemonRouter } from './routes/pokemon.router.js';
import { userRouter } from './routes/user.router.js';
import { getUsers } from './db/users.store.js';
import { hasDailyPokemon } from './db/dailyPokemon.store.js';
import { fetchDailyPokemon } from './utils/fetchPokemon.js';

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
app.use("/pokemon", pokemonRouter);
app.use("/auth", authRouter);
app.use("/users", userRouter);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

async function createDailyPokemon() {
  const res = await getUsers();
  if (res.error) {
    throw new Error(res.error);
  }
  /**
   * @type {import('./db/users.store.js').User[]}
   */
  const users = res.data;
  for (const user of users) {
    const res = await hasDailyPokemon(user);
    if (res.error) throw new Error(res.error);
    if (!res.data) {
      const pokemon = await fetchDailyPokemon();
      // save pokemon to db
    }
  }
}