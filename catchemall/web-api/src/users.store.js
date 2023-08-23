import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { getDbClient } from "./db.js";

/**
 * @typedef Result
 * @property {string} [error]
 * @property {number} [code]
 * @property {any} [data]
 */
/**
 * @typedef {Object} User
 * @property {string} username 
 * @property {string} password 
 * @property {string} salt 
 */

/**
 * @returns {Promise<Result | undefined>}
 * @param {User} user 
 */
export async function saveUser(user) {
  let client;
  try {
    client = await getDbClient();
    const query = `
    INSERT INTO "users" ("username","password","salt") VALUES ($1, $2, $3)
    `;
    await client.query(query, [user.username, user.password, user.salt]);
  } catch (e) {
    if (e.code === "23505") {
      return { error: e.detail, code: 409 };
    }
    return { error: e.detail, code: 500 };
  } finally {
    if (client)
      client.release();
  }
}
/**
 * 
 * @returns {Promise<Result>} 
 */
export async function getUsers() {
  let client;
  try {
    client = await getDbClient();

    const query = `
    SELECT *  FROM "users"
    `;
    /** @type {{rows: User[]}} */
    const res = await client.query(query);
    return { data: res.rows };

  } catch (e) {
    return { error: e.detail };
  } finally {
    if (client)
      client.release();
  }
}

/**
 * 
 * @param {string} username 
 * @returns {Promise<Result>}
 */
export async function getUserByUsername(username) {
  let client;
  try {
    client = await getDbClient();

    const query = `
    SELECT *  FROM "users"
    WHERE username = $1
    `;
    /** @type {{rows: User[]}} */
    const res = await client.query(query, [username]);
    if (res.rows.length === 0) {
      return { error: 'user not found' };
    }
    return { data: res.rows[0] };

  } catch (e) {
    return { error: e.detail };
  } finally {
    if (client)
      client.release();
  }
}

/**
 * 
 * @param {User} user 
 * @returns {string}
 */
export function getTokenForUser(user) {
  if (!user.username) throw new Error('cannot get token for user with no username');
  const secret = process.env['JWT_SECRET_KEY'];
  return jwt.sign({ username: user.username }, secret);
}

/**
 * 
 * @param {string} username 
 * @param {string} password 
 * @returns {Promise<User | null>}
 */
export async function verifyUser(username, password) {
  const res = await getUserByUsername(username);
  const user = res.data;
  if (!user) return null;
  return await compare(password, user.password) ? user : null;
}