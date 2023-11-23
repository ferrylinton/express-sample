const assert = require('assert');
const request = require('supertest');
const app = require('../../src/app');

describe('/', function () {

    describe('GET /', function () {

        it('should return json data', async function () {
            const response = await request(app)
                .get('/')       // memanggil path '/'
                .expect(200);   // cek status = 200

            assert(response.body.NODE_ENV, process.env.NODE_ENV); 
        });

    });

});