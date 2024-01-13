import assert from 'assert';
import request from 'supertest';
import app from '../../src/app';
import { startMongoServer, stopMongoServer } from '../libs/mongo-test-util';

beforeAll(async () => {
    await startMongoServer();
});

afterAll(async () => {
    await stopMongoServer();
});

describe('/api/todoes', () => {

    let _id: string = '0';

    describe('POST /api/todoes', function () {

        it('should create a task', async function () {
            const response = await request(app)
                .post('/api/todoes') 
                .send({ task: 'test' })
                .set('Accept', 'application/json')
                .expect(201); 

            _id = response.body.insertedId;
            expect(response.body.acknowledged).toBe(true);
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
            expect(response.body.length).toBe(1);
        });

    });

    describe('PUT /api/todoes/:_id', function () {

        it('should update task', async function () {
            const response = await request(app)
                .put('/api/todoes/' + _id)
                .send({ task: 'test update' })
                .set('Accept', 'application/json')
                .expect(200);
            expect(response.body.modifiedCount).toBe(1);
        });

    });

    describe('DELETE /api/todoes/:_id', function () {

        it('should update task', async function () {
            const response = await request(app)
                .delete('/api/todoes/' + _id)
                .set('Accept', 'application/json')
                .expect(200);
            expect(response.body.deletedCount).toBe(1);
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