import { beginTransaction, commitTransaction, runQuery } from './db.js';

const TABLE_NAME = 'user_pokemon';

const pokedexIdQuery = (dailyPokemonId) => `SELECT pokedex_id FROM daily_pokemon WHERE id=${dailyPokemonId}`;

export async function getPokemonCaughtForUser(userId) {
    const query = `
  SELECT ${TABLE_NAME}.id, p.pokedex_id,name,image_url,types FROM ${TABLE_NAME}
  INNER JOIN public.pokemon p ON p.pokedex_id = user_pokemon.pokedex_id
  WHERE user_id=$1`;
    const res = await runQuery(query, [userId]);
    if (res.error) return res;
    return { data: res.data.rows };
}

export async function catchPokemon(userId, dailyPokemonId, caught) {
    const canCatchQuery = `SELECT id FROM daily_pokemon 
  WHERE id = $1 
  AND caught IS NULL;
  `;
    let res = await runQuery(canCatchQuery, [dailyPokemonId]);
    if (res.error) return res;
    if (!res.data.rows.length) return { error: `no uncaught pokemon with id: ${dailyPokemonId} found` };
    const client = await beginTransaction();
    let query;
    if (caught) {
        query = `INSERT INTO ${TABLE_NAME} (pokedex_id, user_id) VALUES ((${pokedexIdQuery(dailyPokemonId)}), $1)`;
        await runQuery(query, [userId], client);
    }
    query = `UPDATE daily_pokemon SET caught=$1 WHERE id=$2`;
    await runQuery(query, [caught, dailyPokemonId], client);
    res = await commitTransaction(client);
    return res;
}
