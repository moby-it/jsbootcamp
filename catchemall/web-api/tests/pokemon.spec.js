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
    const users = [];
    beforeAll(async () => {
        app = await bootstrap();
        await runQuery('truncate pokemon_trade cascade', []);
        await runQuery('truncate user_pokemon cascade', []);
        await runQuery('truncate daily_pokemon cascade', []);
        await runQuery('truncate pokemon cascade', []);
        await runQuery('truncate "user" cascade', []);
        await createUser(mockUser, app).then(({ token }) => {
            const r = jwt.verify(token, getJwtSecret());
            users.push({ token: token, userId: r['id'] });
        });
        await createUser(mockUser2, app).then(({ token }) => {
            const r = jwt.verify(token, getJwtSecret());
            users.push({ token: token, userId: r['id'] });
        });
    });
    afterAll(async () => {
        await runQuery('truncate pokemon_trade cascade', []);
        await runQuery('truncate user_pokemon cascade', []);
        await runQuery('truncate daily_pokemon cascade', []);
        await runQuery('truncate "user" cascade', []);
    });
    it(`should return ${getDailyPokemonNumber()} daily pokemon for a given user`, async () => {
        await request(app)
            .get('/pokemon/daily')
            .auth(users[0].token, { type: 'bearer' })
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
    it('should attempt to catch all daily pokemons', async () => {
        const user = users[0];
        const dailyPokemon = new Map();
        await attempthToCatchAllDailyPokemon(user, app, dailyPokemon);
        const caught = Array.from(dailyPokemon.values()).reduce((acc, caught) => {
            if (caught) acc++;
            return acc;
        }, 0);
        await request(app)
            .get(`/pokemon/caught/${users[0].userId}`)
            .auth(user.token, { type: 'bearer' })
            .expect(200)
            .expect((response) => expect(response.body.length).toEqual(caught));
    });
    describe('trade', () => {
        let user1Caught;
        let user2Caught;
        let tradeId;
        beforeAll(async () => {
            await attempthToCatchAllDailyPokemon(users[1], app);
        });
        test('users should have pokemon caught', async () => {
            user1Caught = await fetchCaughtPokemon(users[0], app);
            expect(user1Caught.length).toBeGreaterThan(0);
            user2Caught = await fetchCaughtPokemon(users[1], app);
            expect(user2Caught.length).toBeGreaterThan(0);
        });
        test('submit trade', async () => {
            // ACT
            await createTrade(
                { initiatorUserPokemonId: user1Caught[0].id, responderUserPokemonId: user2Caught[0].id },
                app,
                users[0]
            ).then((r) => (tradeId = r.body.id));
            await createTrade(
                { initiatorUserPokemonId: user1Caught[0].id, responderUserPokemonId: user2Caught[1].id },
                app,
                users[0]
            );

            expect(tradeId).toBeDefined();
            // ASSERT
            await request(app)
                .get('/pokemon/trade')
                .auth(users[0].token, { type: 'bearer' })
                .expect(200)
                .expect((response) => {
                    expect(response.body.length).toEqual(2);
                });
        });
        test('accept trade', async () => {
            // ACT
            await request(app)
                .put('/pokemon/trade')
                .auth(users[0].token, { type: 'bearer' })
                .send({ tradeId, accepted: true })
                .expect(200);
            // ASSERT that trades are empty
            await request(app)
                .get('/pokemon/trade')
                .auth(users[0].token, { type: 'bearer' })
                .expect(200)
                .expect((response) => {
                    expect(response.body.length).toEqual(0);
                });
            // assert that pokedex ids are swapped
            await fetchCaughtPokemon(users[0], app).then((pokemonCaught) => {
                const tradedPokemon = pokemonCaught.find((pc) => pc.id === user1Caught[0].id);
                expect(tradedPokemon.pokedex_id).toEqual(user2Caught[0].pokedex_id);
            });
            await fetchCaughtPokemon(users[1], app).then((pokemonCaught) => {
                const tradedPokemon = pokemonCaught.find((pc) => pc.id === user2Caught[0].id);
                expect(tradedPokemon.pokedex_id).toEqual(user1Caught[0].pokedex_id);
            });
        });
    });
});

async function fetchDailyPokemon(app, token) {
    return await request(app)
        .get('/pokemon/daily')
        .auth(token, { type: 'bearer' })
        .expect(200)
        .then((response) => response.body);
}

async function createUser(user, app) {
    return await request(app)
        .post('/auth/register')
        .send(user)
        .expect(201)
        .then((response) => response.body);
}
async function fetchCaughtPokemon(user, app) {
    const { userId, token } = user;
    return await request(app)
        .get('/pokemon/caught/' + userId)
        .auth(token, { type: 'bearer' })
        .expect(200)
        .then((response) => response.body);
}

async function getConcatIds() {
    const r = await runQuery('SELECT id from daily_pokemon', []);
    expect(r.data).toBeTruthy();
    expect(r.error).toBeUndefined();
    return r.data.rows.reduce((prev, curr) => (prev += curr.id + '_'));
}
async function createTrade({ initiatorUserPokemonId, responderUserPokemonId }, app, user) {
    return await request(app)
        .post('/pokemon/trade')
        .auth(user.token, { type: 'bearer' })
        .send({ initiatorUserPokemonId, responderUserPokemonId })
        .expect(201);
}
/**
 *
 * @description attempt to catch all daily pokemon for given user. \
 * the map argument is mutated in order to include teh user_pokemon_id->caught key-value pair
 * @param {{token:string,userId:number}} user
 * @param {Express.Application} app
 * @param {Map} [map]
 */
async function attempthToCatchAllDailyPokemon(user, app, map) {
    const dailyPokemon = await fetchDailyPokemon(app, user.token);

    if (map) {
        dailyPokemon.forEach((dp) => {
            map.set(dp.id, null);
        });
    }
    for (const { id } of dailyPokemon) {
        await request(app)
            .post(`/pokemon/catch/${id}`)
            .auth(user.token, { type: 'bearer' })
            .expect(200)
            .expect((response) => {
                if (map) map.set(id, response.body.caught);
            });
    }
}
