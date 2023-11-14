import express from 'express';
import { getUsers } from '../db/users.store.js';
import { validateToken } from '../middleware/auth.middleware.js';
import { logAndReturn } from '../utils/log.js';

export const userRouter = express.Router();

userRouter.use(validateToken);

userRouter.get('/', async (req, res) => {
    const response = await getUsers();
    if (response.error) return logAndReturn(res, response.error);
    return res.send(response.data.sort((a, b) => (a.caughtpokemon < b.caughtpokemon ? 1 : -1)));
});
