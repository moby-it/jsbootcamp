import { getDailyPokemonNumber } from '../utils/pokemon.utils.js';
import { runQuery } from './db.js';

const TABLE_NAME = 'daily_pokemon';

/**
 * @typedef {Object} DailyPokemon
 * @property {number} ID
 * @property {number} user_id
 * @property {number} pokedex_id
 */

// verify if a user already has daily pokemon
/**
 *
 * @param {number} userId
 * @returns {Promise<import("./db.js").Result>}
 */
export async function hasDailyPokemon(userId) {
    const res = await runQuery(`SELECT count(*) from ${TABLE_NAME} WHERE user_id = $1;`, [userId]);
    if (res.error) return res;
    const [{ count }] = res.data.rows;
    if (+count === getDailyPokemonNumber()) return { data: true };
    return { data: false };
}

export async function getDailyPokemonForUser(userId) {
    const query = `
  SELECT id, daily_pokemon.pokedex_id,name,image_url,types,caught FROM daily_pokemon
  INNER JOIN public."pokemon" p ON p.pokedex_id = daily_pokemon.pokedex_id
  WHERE user_id = $1
  ORDER BY daily_pokemon.pokedex_id`;
    const res = await runQuery(query, [userId]);
    if (res.error) return res;
    return { data: res.data.rows };
}

export async function savePokemonForUser(pokemonId, userId) {
    const res = await runQuery(`INSERT INTO daily_pokemon (pokedex_id, user_id) VALUES ($1,$2);`, [pokemonId, userId]);
    return res;
}
