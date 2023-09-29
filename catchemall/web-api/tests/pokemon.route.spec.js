import request from "supertest";
import { bootstrap } from "../src/bootstrap.js";

describe('Auth Router Test', () => {
  let app;
  beforeAll(async () => {
    app = await bootstrap();
  });
  it('should pass', () => {
    expect(true).toBeTruthy();
  });
});