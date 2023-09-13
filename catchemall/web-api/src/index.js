import { configDotenv } from 'dotenv';
import express from 'express';
import { validateConfig } from './config.js';
import { createDbPool, seedDatabase } from './db/db.js';
import { registerMiddleware } from './middleware/index.js';
import { authRouter } from './routes/auth.router.js';
import { pokemonRouter } from './routes/pokemon.router.js';
import { userRouter } from './routes/user.router.js';
import { createDailyPokemon, registerRefreshPokemonCron } from './business/dailyPokemon.js';

configDotenv();

validateConfig();

const app = express();
const port = 4000;

registerMiddleware(app);

createDbPool();
await seedDatabase();

await createDailyPokemon();
registerRefreshPokemonCron()
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