import { compare } from "bcrypt";
import { getDbClient } from "./db.js";

const TABLE_NAME = "user";

/**
 * @typedef {Object} User
 * @property {number} ID
 * @property {string} username 
 * @property {string} password 
 * @property {string} salt 
 */

/**
 * @returns {Promise<import("./db.js").Result | undefined>}
 * @param {Omit<User, 'ID'>} user 

 */
export async function saveUser(user) {
  let client;
  try {
    client = await getDbClient();
    const query = `
    INSERT INTO "${TABLE_NAME}" ("username","password","salt") VALUES ($1, $2, $3) RETURNING ID
    `;
    const res = await client.query(query, [user.username, user.password, user.salt]);
    return { data: res.rows[0].id };
  } catch (e) {
    if (e.code === "23505") {
      return { error: "Username already exists", code: 409 };
    }
    return { error: e.detail, code: 500 };
  } finally {
    if (client)
      client.release();
  }
}
/**
 * 
 * @returns {Promise<import("./db.js").Result>} 
 */
export async function getUsers() {
  let client;
  try {
    client = await getDbClient();

    const query = `
    SELECT * FROM "user"
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
 * @returns {Promise<import("./db.js").Result>}
 */
export async function getUserByUsername(username) {
  let client;
  try {
    client = await getDbClient();

    const query = `
    SELECT *  FROM "${TABLE_NAME}"
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
 * @param {string} username 
 * @param {string} password 
 * @returns {Promise<User | string>}
 */
export async function verifyUser(username, password) {
  const res = await getUserByUsername(username);
  const user = res.data;
  if (!user) return 'users does not exists';
  return await compare(password, user.password) ? user : 'Incorrect Password';
}