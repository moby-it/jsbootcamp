import { readFileSync, readdirSync } from 'fs';
import pg from 'pg';

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
    const env = process.env['ENV'] || 'DEV';
    console.log('ENV IS', env);
    if (env === 'PROD') {
        poolConfig.ssl = {
            rejectUnauthorized: false,
        };
    }
    pool = new pg.Pool(poolConfig);
    console.log('connecting to database');
    const client = await getDbClient();
    console.log('Succesfully connected to database');
    client.release();
}

export async function seedDatabase() {
    const tx = await beginTransaction();
    const filenames = readdirSync(__dirname + '/migrations', 'utf-8');
    if (filenames.length <= 0) throw new Error('there no init db file');
    for (const filename of filenames) {
        const query = readFileSync(`${__dirname}/migrations/${filename}`, 'utf-8');
        await tx.query(query);
    }
    const res = await commitTransaction(tx);
    if (res.error) {
        console.error(res.error);
        throw new Error('failed to seed database');
    }
}

export async function getDbClient() {
    const client = await pool.connect();
    if (!client) throw new Error('client is not connected to db');
    return client;
}
/**
 *
 * @param {string} query
 * @param {unknown[]} args
 * @param {pg.PoolClient} [client] If no client is passed, one will be created.
 * @returns {Promise<Result>}
 */
export async function runQuery(query, args, client) {
    const toRelease = !client;
    try {
        if (!client) client = await getDbClient();
        const res = await client.query(query, args);
        return { data: res };
    } catch (e) {
        return { error: e, code: 500 };
    } finally {
        if (toRelease && client) client.release();
    }
}
/**
 * @description Starts a transaction and returns the client in which you add queries.
 * @returns {Promise<pg.PoolClient>} client
 */
export async function beginTransaction() {
    const client = await getDbClient();
    try {
        await client.query('BEGIN');
        return client;
    } catch (e) {
        await client.query('ROLLBACK');
    }
}

/**
 *
 * @param {pg.PoolClient} client
 * @returns {Promise<Result>}
 */
export async function commitTransaction(client) {
    try {
        const res = await client.query('COMMIT');
        return { data: res };
    } catch (e) {
        await client.query('ROLLBACK');
        return { error: e };
    } finally {
        client.release();
    }
}
