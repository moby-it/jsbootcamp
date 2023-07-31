import { compare } from "bcrypt";
import jwt from "jsonwebtoken";

/**
 * @typedef {User}
 * @property {string} username 
 * @property {string} hash 
 * @property {string} salt 
 */

/**
 * @type {User[]}
 */
const users = [];

/**
 * 
 * @param {User} user 
 */
export function saveUser(user) {
  if (users.findIndex(u => u.username === user.username) >= 0) {
    console.warn(`username ${user.username} already exists`);
    return;
  }
  users.push(user);
}
/**
 * 
 * @returns {User[]} 
 */
export function getUsers() {
  return users;
}

/**
 * 
 * @param {string} username 
 * @returns {User}
 */
export function getUserByUsername(username) {
  return users.find(u => u.username === username);
}

/**
 * 
 * @param {User} user 
 * @returns {string}
 */
export function getTokenForUser(user) {
  const secret = process.env['JWT_SECRET_KEY'];
  if (!secret) throw new Error("no env secret provided. Application shutting down...");
  return jwt.sign({ username: user.username, fasolakia: 58 }, secret);
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
 * @returns {Promise<boolean>}
 */
export async function verifyUser(username, password) {
  const user = getUserByUsername(username);
  if (!user) return false;
  const res = await compare(password, user.hash);
  return res;
}