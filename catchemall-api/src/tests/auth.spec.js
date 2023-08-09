import { verifyUser } from "../users.store.js";

describe('run dummy test', () => {
  it('should pass', async () => {
    const r = await verifyUser("george", "123123");
    expect(r).toBeFalsy();
  });
});