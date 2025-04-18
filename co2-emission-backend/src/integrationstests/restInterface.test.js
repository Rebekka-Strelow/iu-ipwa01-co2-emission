const request = require('supertest');
const app = require('../app'); // Express App

describe('GET /data', () => {
    it('should return a list of countries', async () => {
        const res = await request(app).get('/countries');
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});