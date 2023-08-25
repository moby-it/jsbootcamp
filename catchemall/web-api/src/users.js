import express from "express";
import { getUsers } from "./users.store.js";
import { validateToken } from "./auth.middleware.js";

export const usersRouter = express.Router();

usersRouter.use(validateToken);

usersRouter.get('/', async (req, res) => {
  return res.send(await getUsers());
});