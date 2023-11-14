import express from 'express';
import { getDailyPokemonForUser } from '../db/dailyPokemon.store.js';
import { catchPokemon, getPokemonCaughtForUser } from '../db/userPokemon.store.js';
import { validateToken } from '../middleware/auth.middleware.js';
import { attemptCatch } from '../utils/pokemon.utils.js';
import {
    changeTradeStatus,
    getInitiatedTradesForUserId,
    getRequestedTradesForUserId,
    saveTrade,
} from '../db/tradePokemon.store.js';
import { logAndReturn } from '../utils/log.js';
/**
 * @typedef {Object} Pokemon
 * @property {string} id - Pokemon pokedex id
 * @property {string} name
 * @property {Array<string>} types
 * @property {string} imageUrl
 */

export const pokemonRouter = express.Router();

pokemonRouter.use(validateToken);

pokemonRouter.post('/catch/:id', async (req, res) => {
    const user = res.locals.user;
    const dailyPokemonId = req.params.id;
    if (!dailyPokemonId) return res.sendStatus(400);
    const caught = attemptCatch();
    const response = await catchPokemon(user.id, +dailyPokemonId, caught);
    if (response.error) return logAndReturn(res, response.error);
    return res.send({ caught });
});

pokemonRouter.get('/caught/:id', async (req, res) => {
    const userId = req.params.id;
    const response = await getPokemonCaughtForUser(userId);
    if (response.error) return logAndReturn(res, response.error);
    return res.send(response.data);
});
pokemonRouter.get('/daily', async (req, res) => {
    const user = res.locals.user;
    const response = await getDailyPokemonForUser(user.id);
    if (response.error) return logAndReturn(res, response.error);
    return res.send(response.data);
});

pokemonRouter.get('/trade', async (req, res) => {
    const user = res.locals.user;
    let pendingTrades = [];
    let response = await getInitiatedTradesForUserId(user.id);
    if (response.error) return logAndReturn(res, response.error);
    pendingTrades.push(...response.data);
    response = await getRequestedTradesForUserId(user.id);
    if (response.error) return logAndReturn(res, response.error);
    pendingTrades.push(...response.data);
    return res.send(pendingTrades);
});

pokemonRouter.post('/trade', async (req, res) => {
    const { initiatorUserPokemonId, responderUserPokemonId } = req.body;
    if (!initiatorUserPokemonId || !responderUserPokemonId) return res.sendStatus(400);
    const response = await saveTrade(initiatorUserPokemonId, responderUserPokemonId);
    if (response.error) return logAndReturn(res, response.error);
    return res.status(201).send(response.data);
});
pokemonRouter.put('/trade', async (req, res) => {
    const { tradeId, accepted } = req.body;
    if (!tradeId || typeof accepted !== 'boolean') return res.sendStatus(400);
    const response = await changeTradeStatus(tradeId, accepted);
    if (response.error) return logAndReturn(res, response.error);
    return res.sendStatus(200);
});
