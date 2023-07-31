import { Strategy } from 'passport-local';
import passport from 'passport';

export function registerPassportMw() {
  passport.use(new Strategy(
    function (username, password, done) {
      const verified = verifyUser(username);
      if (!verified) return done(new Error("not verified"));
      return done(null, { username: "george", surname: "spanos" });
    }
  ));
}
function verifyUser(username) {
  return username === "george";
}