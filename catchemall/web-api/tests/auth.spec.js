import { bootstrap } from "../src/bootstrap.js";
import request from "supertest";
describe('Auth Router Test', () => {
  let app;
  beforeAll(async () => {
    app = await bootstrap();
  });
  describe.skip('register', () => {
    it('should throw 400 if no body sent', async () => {
      await request(app).post('/auth/register').expect(400);
    });
  });
  describe.skip('login', () => {
    it('should return status 400 if no body sent', async () => {
      await request(app).post('/auth/login').expect(400);
    });
    it('should return 401 if token is expired', async () => {
      await request(app).get('/users').set('Authorization', 'Bearer asdasdas').expect(401);
    });
  });
});