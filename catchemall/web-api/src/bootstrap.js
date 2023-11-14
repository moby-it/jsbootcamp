import { configDotenv } from 'dotenv';
import express from 'express';
import { validateConfig } from './config.js';
import { createDbPool, seedDatabase } from './db/db.js';
import { registerMiddleware } from './middleware/index.js';
import { authRouter } from './routes/auth.router.js';
import { pokemonRouter } from './routes/pokemon.router.js';
import { userRouter } from './routes/user.router.js';
import { createDailyPokemon, registerRefreshPokemonCron } from './utils/dailyPokemon.utils.js';
import { healthRouter } from './routes/health.router.js';

export async function bootstrap() {
    configDotenv();

    validateConfig();

    const app = express();

    registerMiddleware(app);

    createDbPool();
    await seedDatabase();

    await createDailyPokemon();
    registerRefreshPokemonCron();
    // Routes
    app.use('/pokemon', pokemonRouter);
    app.use('/auth', authRouter);
    app.use('/users', userRouter);
    app.use('/health', healthRouter);
    return app;
}
