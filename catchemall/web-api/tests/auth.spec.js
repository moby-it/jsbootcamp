import jsonwebtoken from 'jsonwebtoken';
import { bootstrap } from '../src/bootstrap.js';
import request from 'supertest';
import { getJwtSecret } from '../src/config.js';
import { mockUser } from './fixture.js';
import { runQuery } from '../src/db/db.js';
describe('Auth Router Test', () => {
    let app;
    describe('register', () => {
        beforeAll(async () => {
            await runQuery('truncate "user" cascade', []);
            app = await bootstrap();
        });
        afterAll(async () => {
            await runQuery('truncate "user" cascade', []);
        });
        it('should throw 400 if no body sent', async () => {
            await request(app).post('/auth/register').expect(400);
        });
        it('should throw 400 if no password sent', async () => {
            await request(app).post('/auth/register').send({ username: 'marios' }).expect(400);
        });
        it('should throw 400 if no username sent', async () => {
            await request(app).post('/auth/register').send({ uname: 'marios', ppsd: 'sda' }).expect(400);
        });
        it('should successfully register a user', async () => {
            await request(app).post('/auth/register').send(mockUser).expect(201);
        });
        it('should fail to register a user with the same username', async () => {
            await request(app).post('/auth/register').send(mockUser).expect(409);
        });
    });
    describe('login', () => {
        beforeAll(async () => {
            await runQuery('truncate "user" cascade', []);
            await request(app).post('/auth/register').send(mockUser).expect(201);
            app = await bootstrap();
        });
        afterAll(async () => {
            await runQuery('truncate "user" cascade', []);
        });
        it('should return status 400 if no body sent', async () => {
            await request(app).post('/auth/login').expect(400);
        });
        it('should return 401 if token is expired', async () => {
            await request(app).get('/users').set('Authorization', 'Bearer asdasdas').expect(401);
        });
        it('should successfully login', async () => {
            await request(app)
                .post('/auth/login')
                .send(mockUser)
                .expect(200)
                .expect((response) => {
                    const token = response.body.token;
                    const payload = jsonwebtoken.verify(token, getJwtSecret());
                    expect(payload['id']).toBeTruthy();
                });
        });
    });
});
