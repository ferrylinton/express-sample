const assert = require('assert');
const request = require('supertest');
const app = require('../../src/app');
const { startMongoServer, stopMongoServer } = require('../libs/mongo-test-util');

beforeAll(async () => {
    await startMongoServer();
});

afterAll(async () => {
    await stopMongoServer();
});

describe('/api/todoes', () => {

    let _id = '0';

    describe('POST /api/todoes', function () {

        it('should create a task', async function () {
            const response = await request(app)
                .post('/api/todoes') 
                .send({ task: 'test' })
                .set('Accept', 'application/json')
                .expect(201); 

            _id = response.body.insertedId;
            assert(response.body.acknowledged, true);
        });

    });

    describe('GET /api/todoes/:_id', function () {

        it('should return a task', async function () {
            const response = await request(app)
                .get('/api/todoes/' + _id)
                .set('Accept', 'application/json')
                .expect(200);
            assert(response.body._id, _id);
        });

    });

    describe('GET /api/todoes/', function () {

        it('should return list of tasks', async function () {
            const response = await request(app)
                .get(`/api/todoes`)
                .set('Accept', 'application/json')
                .expect(200);
            assert(response.body.length, 1);
        });

    });

    describe('PUT /api/todoes/:_id', function () {

        it('should update task', async function () {
            const response = await request(app)
                .put('/api/todoes/' + _id)
                .send({ task: 'test update' })
                .set('Accept', 'application/json')
                .expect(200);
            assert(response.body.modifiedCount, 1);
        });

    });

    describe('DELETE /api/todoes/:_id', function () {

        it('should update task', async function () {
            const response = await request(app)
                .delete('/api/todoes/' + _id)
                .set('Accept', 'application/json')
                .expect(200);
            assert(response.body.deletedCount, 1);
        });

    });

    describe('GET (404) /api/todoes/:_id', function () {

        it('should return 404', async function () {
            await request(app)
                .get('/api/todoes/' + _id)
                .set('Accept', 'application/json')
                .expect(404);
        });

    });

})