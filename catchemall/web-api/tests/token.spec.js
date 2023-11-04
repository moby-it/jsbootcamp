// @ts-nocheck
import { getTokenForUser } from '../src/utils/user.utils.js';
import { bootstrap } from '../src/bootstrap.js';
describe('Token Spec', () => {
    it('should throw an error when a user with no username is passed', () => {
        expect(() => getTokenForUser({ username: '', password: 'asds', salt: 'asdasd' })).toThrowError();
    });
    it('should pass if username has at least one character', () => {
        expect(getTokenForUser({ username: 'a', password: '2', salt: 'asd' })).toBeTruthy();
    });
});
