
import express from 'express';

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

export const pokedexRouter = express.Router();

pokedexRouter.post("/catch", (req, res) => {
  res.send(JSON.stringify(req.body));
  const pokemonId = req.body.id;
  if (pokemonId) {
    if (!pokemonCaught.map(p => p.id).includes(pokemonId)) {
      pokemonCaught.push(req.body);
    } else {
      console.warn(`WARNING: duplicate pokemon send. ${req.body.name} is already caught.`);
    }
  }
});
pokedexRouter.get("/caught", (req, res) => {
  res.json(pokemonCaught);
});