import pg from 'pg';
import { UserPokemonCreateQuery, UsersTableCreateQuery } from './queries.js';



/**
 * @type {pg.Pool}
 */
let pool;

export async function createDbPool() {
  pool = new pg.Pool();
  console.log("connecting to database");
  const client = await pool.connect();
  console.log("Succesfully connected to database");
  client.release();
}
export async function seedDatabase() {
  const client = await pool.connect();
  await client.query(UsersTableCreateQuery);
  await client.query(UserPokemonCreateQuery);
}

export async function getDbClient() {
  const client = await pool.connect();
  if (!client) throw new Error("client is not connected to db");
  return client;
}