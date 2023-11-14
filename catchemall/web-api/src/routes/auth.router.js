import bcrypt from 'bcrypt';
import express from 'express';
import passport from 'passport';
import { saveUser } from '../db/users.store.js';
import { getTokenForUser } from '../utils/user.utils.js';
import { createDailyPokemonForUser } from '../utils/dailyPokemon.utils.js';
export const authRouter = express.Router();

authRouter.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.sendStatus(400);

    const saltRounds = 10;

    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    const user = { username, password: hash, salt };
    const result = await saveUser(user);
    if (result?.error) {
        res.status(+result.code).send(result);
        return;
    }
    const token = getTokenForUser({
        username,
        password,
        salt,
        id: result.data,
    });
    await createDailyPokemonForUser(result.data);
    return res.status(201).send({ token });
});

authRouter.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.sendStatus(400);
    passport.authenticate('local', async (err, token) => {
        if (err) return res.status(401).send(err);
        return res.send({ token });
    })(req);
});
