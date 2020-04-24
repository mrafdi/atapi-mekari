const assert = require('chai').expect;
const page = require('../page/booker_api.js');
const auth = require('../page/booker_token.js');
const data = require('../data/create_booking_data.json');
const schema = require('../data/create_booking_schema.json');
const dataAuth = require('../data/create_token_data.json');
var chai = require('chai');
chai.use(require('chai-json-schema'));

const testCaseBook = {
    "positive" : {
       "postBooking" : "As a User, I should be able to create booking from the Restful Booker",
    },
    "negative" : {
       "noData" : "As a User, I should not be able to create booking if the data provided is null",
    }
};

const testCaseDelete = {
    "positive" : {
       "deleteBooking" : "As a User, I should be able to delete booking from the Restful Booker",
    },
    "negative" : {
       "idNotExist" : "As a User, I should not be able to delete booking if the ID provided is not exist",
       "invalidToken" : "As a User, I should not be able to delete booking if the token is invalid"
    }
};

let token, bookingID;

describe(`Mekari Test using Restful Booker`, () => {
    before('token', async () => {
        const response = await auth.createToken(dataAuth);
        assert(response.status).to.equal(200);
        token = response.body.token;
        console.log(token);
    })

    describe('Test Case for Booking', () => {
        it(`@get ${testCaseBook.positive.postBooking}`, async() => {
            const response = await page.createBooking(data);
            assert(response.status).to.equal(200);
            assert(response.body).to.be.jsonSchema(schema);
            bookingID = response.body.bookingid;
            console.log(bookingID);
        })
    
        it(`@get ${testCaseBook.negative.noData}`, async() => {
            const response = await page.createBooking('');
            assert(response.status).to.equal(500);
            // assert(response).to.equal('Internal Server Error');
            // console.log(response)
        })
    })

    describe('Test Case for Delete Booking', () => {
        it(`@get ${testCaseDelete.positive.deleteBooking}`, async() => {
            const response = await page.deleteBooking(bookingID, token);
            assert(response.status).to.equal(201);
            console.log(response.body)
        })
    
        it(`@get ${testCaseDelete.negative.idNotExist}`, async() => {
            const response = await page.createBooking('111', token);
            assert(response.status).to.equal(405);
            console.log(response.body)
            // assert(response.body.Response).to.equal('False');
            // assert(response.body.Error).to.equal('Something went wrong.');
        })
    
        it(`@get ${testCaseBook.negative.invalidApiKey}`, async() => {
            const response = await page.createBooking(bookingID, '');
            assert(response.status).to.equal(403);
            // assert(response.body.Response).to.equal('False');
            // assert(response.body.Error).to.equal('Invalid API key!');
        })
    })
})
