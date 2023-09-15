import { hasDailyPokemon, savePokemonForUser } from '../db/dailyPokemon.store.js';
import { runQuery } from '../db/db.js';
import { savePokemon } from '../db/pokemon.store.js';
import { getUsers } from '../db/users.store.js';
import { fetchDailyPokemon } from '../utils/pokemon.utils.js';

import cron from 'node-cron';

export async function createDailyPokemon() {
  const res = await getUsers();
  if (res.error) {
    throw new Error(res.error);
  }
  /**
   * @type {import('../db/users.store.js').User[]}
   */
  const users = res.data;
  for (const user of users) {
    await createDailyPokemonForUser(user.id);
  }
}

/**
 * 
 * @param {number} userId
 */
export async function createDailyPokemonForUser(userId) {
  const res = await hasDailyPokemon(userId);
  if (res.error) throw new Error(res.error);
  if (!res.data) {
    const pokemons = await fetchDailyPokemon();
    pokemons.forEach(async p => {
      let res = await savePokemon(p);
      res.error ? console.log(p.name, ' not saved') : console.log(p.name, ' saved');
      res = await savePokemonForUser(p.id, userId);
    });
  }
}

async function refreshDailyPokemon() {
  const res = await runQuery('truncate daily_pokemon', []);
  if (res.error) {
    console.log('failed to truncate daily_pokemon');
    return;
  }
  await createDailyPokemon();
  // Schedule tasks to be run on the server.

}
export function registerRefreshPokemonCron() {
  cron.schedule('* * * * *', refreshDailyPokemon, {
    timezone: "Europe/Athens"
  });
}