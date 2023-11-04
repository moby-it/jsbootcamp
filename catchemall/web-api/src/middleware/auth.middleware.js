import jwt from 'jsonwebtoken';
import { getJwtSecret } from '../config.js';

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export function validateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);
    let user;
    try {
        user = jwt.verify(token, getJwtSecret());
        if (!(typeof user === 'object' && 'id' in user)) {
            throw new Error('invalid user extracted from token');
        }
        res.locals.user = user;
    } catch (e) {
        return res.sendStatus(401);
    }
    next();
}
