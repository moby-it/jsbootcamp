import { compare } from 'bcrypt';
import { runQuery } from './db.js';

const TABLE_NAME = 'user';

/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} username
 * @property {string} password
 * @property {string} salt
 */

/**
 * @returns {Promise<import("./db.js").Result | undefined>}
 * @param {Omit<User, 'id'>} user 

 */
export async function saveUser(user) {
    const res = await runQuery(
        `
  INSERT INTO "${TABLE_NAME}" ("username","password","salt") VALUES ($1, $2, $3) RETURNING ID`,
        [user.username, user.password, user.salt],
    );

    if (res.error) {
        if (res.error.code === '23505') {
            return { error: 'Username already exists', code: 409 };
        }
        return { error: res.error.detail, code: 500 };
    }
    return { data: res.data.rows[0].id };
}
/**
 *
 * @returns {Promise<import("./db.js").Result>}
 */
export async function getUsers() {
    const res = await runQuery(
        `
  SELECT "user".id, username, COUNT(up.pokedex_id) AS caughtPokemon FROM "user"
  LEFT JOIN public.user_pokemon up ON "user".id = up.user_id
  GROUP BY "user".id, username;
  `,
        [],
    );
    if (res.error) return res.error;
    return { data: res.data.rows };
}

/**
 *
 * @param {string} username
 * @returns {Promise<import("./db.js").Result>}
 */
export async function getUserByUsername(username) {
    const res = await runQuery(`SELECT * FROM "${TABLE_NAME}" WHERE username = $1`, [username]);
    if (res.error) return res.error;
    if (res.data.rows.length === 0) {
        return { error: 'user not found' };
    }
    return { data: res.data.rows[0] };
}

/**
 *
 * @param {string} username
 * @param {string} password
 * @returns {Promise<User | string>}
 */
export async function verifyUser(username, password) {
    const res = await getUserByUsername(username);
    const user = res.data;
    if (!user) return 'user does not exist';
    return (await compare(password, user.password)) ? user : 'Incorrect Password';
}
