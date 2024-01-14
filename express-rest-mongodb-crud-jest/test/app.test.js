const assert =  require('assert');
const request =  require('supertest');
const app =  require('../src/app');

describe('app', () => {

    describe('GET /api/notfound', function () {

        it('should return 404', async function () {
            const response = await request(app)
                .get(`/api/notfound`)
                .set('Accept', 'application/json')
                .expect(404);
            assert(response.body.message, 'Not Found');
        });

    });

})