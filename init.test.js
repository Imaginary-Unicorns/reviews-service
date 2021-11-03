require("dotenv").config();
const mongoose = require("mongoose");
const database = require("./db/database");



describe("Connection", () => {
  // beforeAll(async (done) => {
  //   await mongoose.connect(process.env.mongoReviewsURI)
  //   done();
  // });

  test("Retrieve article by review_id", () => {
    const id = "5";
    return database.Reviews.findOne({ 'review_id': id })
    .then(review => {
      expect(review.summary).toBe("I'm  wearing these shades");
      // done();
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
});