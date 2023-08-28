import express from "express";
import { getUsers } from "../users.store.js";
import { validateToken } from "../middleware/auth.middleware.js";

export const userRouter = express.Router();

userRouter.use(validateToken);

userRouter.get('/', async (req, res) => {
  return res.send(await getUsers());
});