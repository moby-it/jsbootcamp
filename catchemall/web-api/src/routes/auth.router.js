import bcrypt from 'bcrypt';
import express from "express";
import passport from "passport";
import { saveUser } from "../db/users.store.js";
import { getTokenForUser } from '../utils/user.utils.js';
export const authRouter = express.Router();


authRouter.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.sendStatus(400);

  let saltRounds = Number(process.env['SALT_ROUNDS']);

  if (!saltRounds) {
    console.warn('SALT_ROUNDS not found in env. defaulting to 10');
    saltRounds = 10;
  };
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  const user = { username, password: hash, salt };
  const result = await saveUser(user);
  if (result?.error) {
    res.status(result.code).send(result);
    return;
  }
  const token = getTokenForUser({ username, password, salt, ID: result.data });
  return res.send({ token });
});

authRouter.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.sendStatus(400);
  passport.authenticate('local', async (err, token) => {
    if (err) return res.status(401).send(err);
    return res.send({ token });
  })(req, res);
});

