import { Strategy } from 'passport-local';
import { getTokenForUser, verifyUser } from './users.store.js';
import passport from 'passport';

export function registerPassportMw() {
  passport.use(new Strategy(
    async function (username, password, done) {
      const result = await verifyUser(username, password);
      if (typeof result === 'string') return done({ code: 401, error: result });
      return done(null, getTokenForUser(result));
    }
  ));
}
