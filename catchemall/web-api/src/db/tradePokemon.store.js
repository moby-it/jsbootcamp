import { runQuery } from "./db.js";

const TABLE_NAME = "pokemon_trade";

const tradesQuery = `
SELECT pokemon_trade.id,
       upi.pokedex_id AS initiator_pokedex_id,
       pi.name         AS initiator_pokemon_name,
       pi.image_url    AS initiatior_pokemon_image_url,
       pr.name AS responder_pokemon_name,
       pr.image_url AS responder_pokemon_image_url
FROM pokemon_trade

INNER JOIN public.user_pokemon upi ON upi.id = pokemon_trade.initiator_user_pokemon_id
INNER JOIN public.pokemon pi ON pi.pokedex_id = upi.pokedex_id

INNER JOIN public.user_pokemon upr ON upr.id = pokemon_trade.responder_user_pokemon_id
INNER JOIN public.pokemon pr ON pr.pokedex_id = upr.pokedex_id`;

/**
 * 
 * @param {number} initiationUserPokemonId 
 * @param {number} responderUserPokemonId 
 * @returns {Promise<import("./db.js").Result>}
 */
export async function saveTrade(initiationUserPokemonId, responderUserPokemonId) {
  const res = await runQuery(`
  INSERT INTO ${TABLE_NAME} (initiator_user_pokemon_id, responder_user_pokemon_id)
  VALUES ($1,$2)`, [initiationUserPokemonId, responderUserPokemonId]);
  return res;
}

/**
 * 
 * @param {number} tradeId 
 * @param {boolean} accepted 
 * @returns {Promise<import("./db.js").Result>}
 */
export async function changeTradeStatus(tradeId, accepted) {
  let res = await runQuery(`
    UPDATE ${TABLE_NAME} SET accepted=$1 WHERE id=$2;
  `, [accepted, tradeId]);
  if (accepted) {
    res = await runQuery(`call swap_pokemon($1)`, [tradeId]);
  }
  return res;
}

export async function getInitiatedTradesForUserId(userId) {
  const res = await runQuery(`
  ${tradesQuery}
  INNER JOIN public."user" u ON u.id = upi.user_id
  WHERE u.id = $1 AND accepted IS NULL
`, [userId]);
  return res;
};
export async function getRequestedTradesForUserId(userId) {
  const res = await runQuery(`
  ${tradesQuery}
  INNER JOIN public."user" u ON u.id = upr.user_id
  WHERE u.id = $1 AND accepted IS NULL
`, [userId]);
  return res;
};