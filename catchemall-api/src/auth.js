import express from "express";
import passport from "passport";

export const authRouter = express.Router();

authRouter.post("/login", (req, res) => {
  passport.authenticate('local', async (err, user) => {
    if (err) return res.sendStatus(401);
    return res.send("Logged in succesfully");
  })(req, res);
});