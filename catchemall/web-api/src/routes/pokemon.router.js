
import express from 'express';
import { getDailyPokemonForUser } from '../db/dailyPokemon.store.js';
import { catchPokemon, getPokemonCaughtForUser } from '../db/userPokemon.store.js';
import { validateToken } from '../middleware/auth.middleware.js';
import { attemptCatch } from '../utils/pokemon.utils.js';
/**
 * @typedef {Object} Pokemon
 * @property {string} id - Pokemon pokedex id
 * @property {string} name
 * @property {Array<string>} types
 * @property {string} imageUrl 
 */


export const pokemonRouter = express.Router();

pokemonRouter.use(validateToken);

pokemonRouter.post("/catch/:id", async (req, res) => {
  const user = res.locals.user;
  const pokemonId = req.params.id;
  if (!pokemonId) return res.sendStatus(400);
  const caught = attemptCatch();
  const response = await catchPokemon(user.id, +pokemonId, caught);
  if (response.error) return res.status(500).send(response.error);
  return res.send({ caught });
});
pokemonRouter.get("/caught", async (req, res) => {
  const user = res.locals.user;
  const response = await getPokemonCaughtForUser(user.id);
  if (response.error) return res.sendStatus(500);
  return res.send(response.data);
});
pokemonRouter.get("/caught/:id", async (req, res) => {
  const userId = req.params.id;
  const response = await getPokemonCaughtForUser(userId);
  if (response.error) return res.sendStatus(500);
  return res.send(response.data);
});
pokemonRouter.get("/daily", async (req, res) => {
  const user = res.locals.user;
  const response = await getDailyPokemonForUser(user.id);
  if (response.error) return res.sendStatus(500);
  return res.send(response.data);
});