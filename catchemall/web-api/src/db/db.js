import pg from 'pg';
import { readFileSync, readdir, readdirSync } from 'fs';

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


/**
 * @typedef Result
 * @property {string} [error]
 * @property {number} [code]
 * @property {any} [data]
 */

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
  const filenames = readdirSync(__dirname + '/migrations', 'utf-8');
  if (filenames.length <= 0) throw new Error("there no init db file");
  for (const filename of filenames) {
    const query = readFileSync(`${__dirname}/migrations/${filename}`, 'utf-8');
    await client.query(query);
  }
}

export async function getDbClient() {
  const client = await pool.connect();
  if (!client) throw new Error("client is not connected to db");
  return client;
}