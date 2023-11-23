const assert = require('assert');
const request = require('supertest');
const app = require('../../src/app');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { mongoClient } = require('../../src/configs/mongodb');


describe('/api/todoes', () => {

    let mongoServer;

    beforeAll(async () => {
        mongoServer = new MongoMemoryServer({
            instance: {
                port: 27017,
                dbName: 'blogdb'
            }
        })

        await mongoServer.start();
    });

    afterAll(async () => {
        const connection = await mongoClient;
        connection.close();
        await mongoServer.stop();
    });

    let _id = '0';

    describe('POST /api/todoes', function () {

        it('should create a task', async function () {
            const response = await request(app)
                .post('/api/todoes')       // memanggil path '/'
                .send({ task: 'test' })
                .set('Accept', 'application/json')
                .expect(201);   // cek status = 201
            
            _id = response.body._id;
            assert(response.body.task, 'test'); // cek di response, message = 'OK'
        });

    });

    describe('GET /api/todoes/:id', function () {

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

    describe('PUT /api/todoes/:id', function () {

        it('should update task', async function () {
            const response = await request(app)
                .put('/api/todoes/' + _id)
                .send({ task: 'test update' })
                .set('Accept', 'application/json')
                .expect(200);
            assert(response.body.modifiedCount, 1);
        });

    });

    describe('DELETE /api/todoes/:id', function () {

        it('should update task', async function () {
            const response = await request(app)
                .delete('/api/todoes/' + _id)
                .set('Accept', 'application/json')
                .expect(200);
            assert(response.body.deletedCount, 1);
        });

    });

    describe('GET /api/todoes/:id', function () {

        it('should return 404', async function () {
            const response = await request(app)
                .get('/api/todoes/' + _id)
                .set('Accept', 'application/json')
                .expect(404);
        });

    });

})