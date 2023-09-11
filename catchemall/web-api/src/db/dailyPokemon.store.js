import { getDbClient } from "./db.js";

const TABLE_NAME = "daily_pokemon";

/**
 * @typedef Result
 * @property {string} [error]
 * @property {number} [code]
 * @property {any} [data]
 */
/**
 * @typedef {Object} DailyPokemon
 * @property {number} ID 
 * @property {number} user_id 
 * @property {number} pokedex_id 
 */

// verify if a user already has daily pokemon
/**
 * 
 * @param {import("./users.store.js").User} user 
 * @returns {Promise<Result>}
 */
export async function hasDailyPokemon(user) {
  let client;
  try {
    client = await getDbClient();
    const query = `
    SELECT count(*) from ${TABLE_NAME} WHERE user_id = $1;
    `;
    const res = await client.query(query, [user.ID]);
    const [{ count }] = res.rows;
    if (count > 0) return { data: true };
    return { data: false };
  } catch (e) {
    return { error: e.detail, code: 500 };
  } finally {
    if (client)
      client.release();
  }
}
// export async function savePokemonForUser(pokemon, user) {

// }