import request from "supertest";
import { bootstrap } from "../src/bootstrap.js";
import jwt from "jsonwebtoken";
import { getJwtSecret } from "../src/config.js";
import { runQuery } from "../src/db/db.js";
describe('Pokemon Router Test', () => {
  let app;
  beforeAll(async () => {
    app = await bootstrap();
  });
  afterAll(async () => {
    await runQuery('truncate "user" cascade', []);
  });
  describe('it should attempt to catch only clicked pokemon', () => {
    let userId;
    beforeAll(async () => {
      const user = { username: "manolis", password: "olamis" };
      await request(app).post('/auth/register').send(user).expect(200).expect(response => {
        const { token } = response.body;
        console.log(token);
        const r = jwt.verify(token, getJwtSecret());
        userId = r['id'];
      });
    });
    it('smoke test', () => {
      expect(userId).toBeTruthy();
    });
  });
});