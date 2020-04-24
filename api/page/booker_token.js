const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.BOOKER_BASE_URL);

const createToken = (body) => api.post('/auth/')
	.set('Content-Type', 'application/json')
    .send(body);

module.exports = {
    createToken
}