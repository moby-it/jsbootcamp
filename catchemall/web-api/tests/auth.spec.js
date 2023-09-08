import { configDotenv } from "dotenv";
import express from "express";
import request from "supertest";
import { registerMiddleware } from "../src/middleware/index.js";
import { authRouter } from "../src/routes/auth.router.js";
import { userRouter } from "../src/routes/user.router.js";
describe('Auth Router Test', () => {
  let app;
  beforeAll(() => {
    app = express();
    configDotenv({ path: 'test.env' });
    registerMiddleware(app);
    app.use("/auth", authRouter);
    app.use('/users', userRouter);
  });
  describe('register', () => {
    it('should throw 400 if no body sent', async () => {
      await request(app).post('/auth/register').expect(400);
    });
  });
  describe('login', () => {
    it('should return status 400 if no body sent', async () => {
      await request(app).post('/auth/login').expect(400);
    });
    it('should return 401 if token is expired', async () => {
      await request(app).get('/users').set('Authorization', 'Bearer asdasdas').expect(401);
    });
  });
});