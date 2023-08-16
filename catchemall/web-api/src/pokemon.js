
import express from 'express';
import fs from 'fs';
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
const pokemonCaughtFileName = "pokemonCaught.json";
pokedexRouter.post("/catch", async (req, res) => {
  const pokemonId = req.body.id;
  if (pokemonId) {
    if (!pokemonCaught.map(p => p.id).includes(pokemonId)) {
      pokemonCaught.push(req.body);
      await savePokemon(req.body);
      res.send(JSON.stringify(req.body));
    } else {
      console.warn(`WARNING: duplicate pokemon send. ${req.body.name} is already caught.`);
      res.sendStatus(409);

    }
  }
});
pokedexRouter.get("/caught", (req, res) => {
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