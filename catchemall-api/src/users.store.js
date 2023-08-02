import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { getDbClient } from "./db.js";

/**
 * @typedef {Object} User
 * @property {string} username 
 * @property {string} hash 
 * @property {string} salt 
 */

/**
 * 
 * @param {User} user 
 */
export async function saveUser(user) {
  const client = getDbClient();
  const query = `
  INSERT INTO "users" ("username","password","salt") VALUES ($1, $2, $3)
  `;
  await client.query(query, [user.username, user.hash, user.salt]);
}
/**
 * 
 * @returns {Promise<User[]>} 
 */
export async function getUsers() {
  const client = getDbClient();

  /** @type {{rows: User[]}} */

  const res = await client.query(`SELECT *  FROM "users"`);
  return res.rows;
}

/**
 * 
 * @param {string} username 
 * @returns {User | undefined}
 */
export function getUserByUsername(username) {
  return;
  // return users.find(u => u.username === username);
}

/**
 * 
 * @param {User} user 
 * @returns {string}
 */
export function getTokenForUser(user) {
  const secret = process.env['JWT_SECRET_KEY'];
  if (!secret) throw new Error("no env secret provided. Application shutting down...");
  return jwt.sign({ username: user.username }, secret);
}
// export function getCurrentUser(id) {
// users.find etc etc
// SELECT * FROM WHERE USER.ID === ID
// returns a user
// }
/**
 * 
 * @param {string} username 
 * @param {string} password 
 * @returns {Promise<User | null>}
 */
export async function verifyUser(username, password) {
  const user = getUserByUsername(username);
  if (!user) return null;
  return await compare(password, user.hash) ? user : null;
}