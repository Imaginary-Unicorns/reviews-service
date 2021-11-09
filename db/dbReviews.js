const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://localhost:27017/allReviews');
};
const fs = require('fs');
const parse = require('csv-parser')

const reviewSchema = new mongoose.Schema({
  review_id: Number,
  product_id: Number,
  summary: String,
  recommend: Boolean,
  response: String,
  rating: Number,
  body: String,
  date: Date,
  reviewer_name: String,
  reviewer_email: String,
  helpfulness: Number,
  reported: Boolean
})

const Reviews = mongoose.model('Reviews', reviewSchema);

let readStream = fs.createReadStream('/Users/ojeikuaisiku/Documents/HackReactor/SDC/reviews-service/reviews/reviews-12.csv');

let count = 1
readStream.pipe(parse({delimiter: ','})).on('data', data => {
  let newReview = new Reviews({
    product_id: data.product_id,
    review_id: count,
    summary: data.summary,
    rating: data.rating,
    recommend: data.recommend,
    response: data.response,
    body: data.body,
    date: data.date,
    reviewer_name: data.reviewer_name,
    reviewer_email: data.reviewer_email,
    helpfulness: data.helpfulness,
    reported: data.reported
  })
  newReview.save();
  count++
})

readStream.on('end', ()=> console.log('end.'))