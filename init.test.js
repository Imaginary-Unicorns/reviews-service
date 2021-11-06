require("dotenv").config()
const mongoose = require("mongoose")
const database = require("./db/database")
const app = require('./server/serv.js')
const supertest = require('supertest')
const request = supertest(app)

describe("Connection", () => {
  // beforeAll(async (done) => {
  //   await mongoose.connect(process.env.mongoReviewsURI)
  //   done();
  // });

  test("Retrieve article by review_id", async (done) => {
    const id = "1";
    return database.Reviews.findOne({ 'review_id': id }).lean()
    .then(review => {
      expect(review.summary).toBe("This product was great!");
    })
    .catch(err => console.error(err));
  });

//   afterAll(async done => {
//     await mongoose.disconnect();
//     done();
// });
});

describe('Tests', function() {
  test('Should provide a test', function() {
    expect(1+1).toEqual(2);
  });
  test('Should test http requests', async function(done) {
    const response = await request.get('/test')
    return await request.get('/test').then(data => {
      expect(response.status).toBe(200);
      expect(response.text).toBe('success');
    })
    .catch(err => console.error(err));
  });
  test('Should fetch a review', async function(done) {
    let config = {
      params: {
        'product_id': 1
      }
    }
    const response = await request.get('/reviews', config)
    return response.then(data => {
      expect(response.status).toBe(200);
      expect(response.text.results).toBe('Consectetur quia aut et et sed. In sunt magni aut earum qui aut reprehenderit. Repellendus blanditiis quae incidunt harum. Ut inventore quas.');
    })
    .catch(err => console.error(err));
  });
});