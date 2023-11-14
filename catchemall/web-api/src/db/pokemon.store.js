import { runQuery } from './db.js';

const TABLE_NAME = 'pokemon';

/**
 * @typedef {Object} Pokemon
 * @property {string} id - Pokemon pokedex id
 * @property {string} name
 * @property {Array<string>} types
 * @property {string} imageUrl
 */

/**
 *
 * @param {Pokemon} pokemon
 */
export async function savePokemon(pokemon) {
    const query = `INSERT INTO ${TABLE_NAME} (pokedex_id, name, image_url, types) VALUES ($1,$2,$3,$4)`;
    const res = await runQuery(query, [pokemon.id, pokemon.name, pokemon.imageUrl, JSON.stringify(pokemon.types)]);
    return res;
}
