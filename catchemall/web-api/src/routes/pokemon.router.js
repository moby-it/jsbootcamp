
import express from 'express';
import fs from 'fs';
import { validateToken } from '../middleware/auth.middleware.js';
/**
 * @typedef {Object} Pokemon
 * @property {string} id - Pokemon pokedex id
 * @property {string} name
 * @property {Array<string>} types
 * @property {string} imageUrl 
 */

/**
 * @type {Pokemon[]}
 */
const pokemonCaught = [];

export const pokemonRouter = express.Router();

pokemonRouter.use(validateToken);

const pokemonCaughtFileName = "pokemonCaught.json";
pokemonRouter.post("/catch", async (req, res) => {
  const pokemonId = req.body.id;
  if (pokemonId) {
    pokemonCaught.push(req.body);
    await savePokemon(req.body);
    res.send(JSON.stringify(req.body));
  }
});
pokemonRouter.get("/caught", (req, res) => {
  res.json(pokemonCaught);
});
async function savePokemon(pokemon) {
  const exists = fs.existsSync(pokemonCaughtFileName);
  if (!exists) {
    fs.writeFileSync(pokemonCaughtFileName, JSON.stringify([]));
  }
  const data = fs.readFileSync(pokemonCaughtFileName, 'utf-8');
  const pokemonCaught = JSON.parse(data);
  pokemonCaught.push(pokemon);
  fs.writeFileSync(pokemonCaughtFileName, JSON.stringify(pokemonCaught));
}