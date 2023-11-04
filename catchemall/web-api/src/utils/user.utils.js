import jwt from 'jsonwebtoken';
import { getTokenExpiresIn } from '../config.js';

/**
 *
 * @param {import('../db/users.store.js').User} user
 * @returns {string}
 */
export function getTokenForUser(user) {
    if (!user.username) throw new Error('cannot get token for user with no username');
    const secret = process.env['JWT_SECRET_KEY'];
    return jwt.sign({ username: user.username, id: user.id }, secret, { expiresIn: getTokenExpiresIn() });
}
