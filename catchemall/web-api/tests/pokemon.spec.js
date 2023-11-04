import jwt from 'jsonwebtoken';
import request from 'supertest';
import { bootstrap } from '../src/bootstrap.js';
import { getJwtSecret } from '../src/config.js';
import { runQuery } from '../src/db/db.js';
import { refreshDailyPokemon } from '../src/utils/dailyPokemon.utils.js';
import { getDailyPokemonNumber } from '../src/utils/pokemon.utils.js';
import { mockUser, mockUser2 } from './fixture.js';
describe('Pokemon Spec', () => {
    let app;
    let userId;
    let token;
    beforeAll(async () => {
        await runQuery('truncate "user" cascade', []);
        app = await bootstrap();
        const user = mockUser;
        await request(app)
            .post('/auth/register')
            .send(user)
            .expect(async (response) => {
                token = response.body.token;
                const r = jwt.verify(token, getJwtSecret());
                userId = r['id'];
            });
    });
    afterAll(async () => {
        await runQuery('truncate "user" cascade', []);
    });
    describe('daily pokemon', () => {
        async function getConcatIds() {
            const r = await runQuery('SELECT id from daily_pokemon', []);
            expect(r.data).toBeTruthy();
            expect(r.error).toBeUndefined();
            return r.data.rows.reduce((prev, curr) => (prev += curr.id + '_'));
        }
        it(`should return ${getDailyPokemonNumber()} daily pokemon for a given user`, async () => {
            await request(app)
                .get('/pokemon/daily')
                .auth(token, { type: 'bearer' })
                .expect(200)
                .expect((response) => {
                    expect(response.body.length).toEqual(getDailyPokemonNumber());
                });
        });
        it('should refresh daily pokemon', async () => {
            const prevIds = await getConcatIds();
            await refreshDailyPokemon();
            const newIds = await getConcatIds();
            expect(prevIds).not.toEqual(newIds);
        });
    });
    describe('catch pokemon', () => {
        const dailyPokemon = new Map();
        it('should attempt to catch a daily pokemon', async () => {
            // ARRANGE
            await request(app)
                .get('/pokemon/daily')
                .auth(token, { type: 'bearer' })
                .expect(200)
                .expect((response) => {
                    response.body.forEach((dp) => dailyPokemon.set(dp.id, null));
                });
            // ACT
            for (const [id] of dailyPokemon.entries()) {
                await request(app)
                    .post(`/pokemon/catch/${id}`)
                    .auth(token, { type: 'bearer' })
                    .expect(200)
                    .expect((response) => {
                        dailyPokemon.set(id, response.body.caught);
                    });
            }
            const caught = Array.from(dailyPokemon.values()).reduce((acc, caught) => {
                if (caught) acc++;
                return acc;
            }, 0);
            // ASSERT
            await request(app)
                .get(`/pokemon/caught/${userId}`)
                .auth(token, { type: 'bearer' })
                .expect(200)
                .expect((response) => expect(response.body.length).toEqual(caught));
        });
    });
    describe('trade pokemon', () => {
        const dailyPokemon = new Map();
        beforeAll(async () => {
            // create 2nd user
            await request(app).post('auth/register').send(mockUser2).expect(201);
            await request(app)
                .get('/pokemon/daily')
                .auth(token, { type: 'bearer' })
                .expect(200)
                .expect((response) => {
                    response.body.forEach((dp) => dailyPokemon.set(dp.id, null));
                });
        });

        it('smome test', () => {
            expect(1).toBeTruthy();
        });
    });
});
