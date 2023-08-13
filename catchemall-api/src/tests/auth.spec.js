import express from "express";
import request from "supertest";
import { registerMiddleware } from "../middleware.js";
import { authRouter } from "../auth.js";

describe('Auth Router Test', () => {
  let app;
  beforeAll(() => {
    app = express();
    registerMiddleware(app);
    app.use("/auth", authRouter);
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
  });
});