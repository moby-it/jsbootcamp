import pg from 'pg';
import { readFileSync, readdirSync } from 'fs';

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


/**
 * @typedef Result
 * @property {any} [error]
 * @property {string | number} [code]
 * @property {any} [data]
 */

/**
 * @type {pg.Pool}
 */
let pool;

export async function createDbPool() {
  const connectionString = process.env['DB_CONNECTION_STRING'];
  const poolConfig = {
    connectionString,
  };
  console.log('ENV IS', process.env['ENV']);
  if (process.env['ENV'] === 'PROD') {
    poolConfig.ssl = {
      rejectUnauthorized: false,
    };
  }
  pool = new pg.Pool(poolConfig);
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
/**
 * 
 * @param {string} query 
 * @param {unknown[]} args
 * @returns {Promise<Result>}
 */
export async function runQuery(query, args) {
  let client;
  try {
    client = await getDbClient();
    const res = await client.query(query, args);
    return { data: res };
  } catch (e) {
    return { error: e, code: 500 };
  } finally {
    if (client)
      client.release();
  }
}