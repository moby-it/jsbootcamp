import { runQuery } from "./db.js";

const TABLE_NAME = "pokemon_trade";

/**
 * 
 * @param {number} initiationUserPokemonId 
 * @param {number} receiverUserPokemonId 
 * @returns {Promise<import("./db.js").Result>}
 */
export async function saveTrade(initiationUserPokemonId, receiverUserPokemonId) {
  const res = await runQuery(`
  INSERT INTO ${TABLE_NAME} (initiator_user_pokemon_id,receiver_user_pokemon_id)
  VALUES ($1,$2)`, [initiationUserPokemonId, receiverUserPokemonId]);
  return res;
}

/**
 * 
 * @param {number} tradeId 
 * @param {boolean} accepted 
 * @returns {Promise<import("./db.js").Result>}
 */
export async function changeTradeStatus(tradeId, accepted) {
  const res = await runQuery(`
    UPDATE ${TABLE_NAME} SET accepted=$1 WHERE id=$2;
  `, [accepted, tradeId]);
  return res;
}

export async function getTradesForUserId(userId) {
  throw new Error('wip');
  const res = await runQuery(`
  SELECT ${TABLE_NAME} SET accepted=$1 WHERE id=$2;
`, [userId]);
};