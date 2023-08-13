import { Strategy } from 'passport-local';
import { getTokenForUser, verifyUser } from './users.store.js';
import passport from 'passport';

export function registerPassportMw() {
  passport.use(new Strategy(
    async function (username, password, done) {
      const user = await verifyUser(username, password);
      if (!user) return done(new Error("not verified"));
      return done(null, getTokenForUser(user));
    }
  ));
}