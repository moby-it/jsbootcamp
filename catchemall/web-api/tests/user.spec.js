import jwt from 'jsonwebtoken';
import request from 'supertest';
import { bootstrap } from '../src/bootstrap.js';
import { getJwtSecret } from '../src/config.js';
import { mockUser } from './fixture.js';
import { runQuery } from '../src/db/db.js';

describe('User Spec', () => {
    let app;
    let token;
    beforeAll(async () => {
        await runQuery('truncate "user" cascade', []);
        app = await bootstrap();
        await request(app)
            .post('/auth/register')
            .send(mockUser)
            .expect(201)
            .expect(async (response) => {
                token = response.body.token;
                expect(token).toBeTruthy();
                jwt.verify(token, getJwtSecret());
            });
    });
    afterAll(async () => {
        await runQuery('truncate "user" cascade', []);
    });
    it('get all users, currently only one', async () => {
        await request(app)
            .get('/users')
            .auth(token, { type: 'bearer' })
            .expect(200)
            .expect((response) => expect(response.body.length).toEqual(1));
    });
});
