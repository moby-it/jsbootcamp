import { getTokenForUser } from "../src/utils/user.utils.js";

describe('Get Token For User', () => {
  it('should throw an error when a user with no username is passed', () => {
    expect(() => getTokenForUser({ username: '', password: 'asds', salt: 'asdasd' })).toThrowError();
  });
  it('should throw an error if no JWT_SECRET_KEY is found', () => {
    expect(() => getTokenForUser({ username: 'a', password: 'asds', salt: 'asdasd' })).toThrowError();
  });
  it('should pass if username has at least one character', () => {
    process.env['JWT_SECRET_KEY'] = '1asdasdas';
    expect(getTokenForUser({ username: 'a', password: '2', salt: 'asd' })).toBeTruthy();
  });
});