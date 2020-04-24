const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.BOOKER_BASE_URL);

const createBooking = data => api.post('/booking')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .send(data);

const deleteBooking = (id, token) => api.delete(`/booking/${id}`)
    .set('Content-Type', 'application/json')
    .set('Cookie', 'token='+token);

module.exports = {
    createBooking,
    deleteBooking
}