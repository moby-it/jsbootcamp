import { Strategy } from 'passport-local';
import { verifyUser } from '../db/users.store.js';
import passport from 'passport';
import { getTokenForUser } from '../utils/user.utils.js';

export function registerPassportMiddleware() {
    passport.use(
        new Strategy(async function (username, password, done) {
            const result = await verifyUser(username, password);
            if (typeof result === 'string') return done({ code: 401, error: result });
            return done(null, getTokenForUser(result));
        }),
    );
}
