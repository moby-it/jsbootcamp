import { runQuery } from "./db.js";

const TABLE_NAME = 'user_pokemon';


export async function getPokemonCaughtForUser(userId) {
  const query = `
  select p.pokedex_id,name,image_url,types from ${TABLE_NAME}
  inner join public.pokemon p on p.pokedex_id = user_pokemon.pokedex_id
  where user_id = $1`;
  const res = await runQuery(query, [userId]);
  return { data: res.data.rows };
}

export async function catchPokemon(userId, pokemonId, caught) {
  const canCatchQuery = `select id from daily_pokemon 
  where pokedex_id = $1 
    AND user_id = $2 
    AND caught IS NULL;
  `;
  let res = await runQuery(canCatchQuery, [pokemonId, userId]);
  if (res.error) return res;
  if (res.data.rows.length) {
    let query;
    if (caught) {
      query = `insert INTO user_pokemon (pokedex_id, user_id) VALUES ($1, $2)`;
      res = await runQuery(query, [pokemonId, userId]);
    }
    query = `UPDATE daily_pokemon set caught=$1 where pokedex_id=$2 and user_id=$3`;
    res = await runQuery(query, [caught, pokemonId, userId]);
    return res;
  }
  return { error: "YOU ARE A SCUM OF THE EARTH" };
}