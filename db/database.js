const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://localhost:27017/reviews')
    .then(data => console.log(`Connected to Mongoose at port ${27017}`));
};
const fs = require('fs');
const parse = require('csv-parser')
// import { csvToDB } from 'csvToDB';

// id,product_id,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness

const reviewSchema = new mongoose.Schema({
  review_id: Number,
  product_id: Number,
  summary: String,
  recommend: Boolean,
  response: String,
  body: String,
  date: Date,
  reviewer_name: String,
  reviewer_email: String,
  helpfulness: Number,
  reported: Boolean
})

const photoSchema = new mongoose.Schema({
  review_id: Number,
  url: String
})
const Photos = mongoose.model('Photos', photoSchema);

const characteristicsSchema = new mongoose.Schema({
  characteristic_id: Number,
  product_id: Number,
  name: String,
})

const characteristicReviewsSchema = new mongoose.Schema({
  placeholder_id: Number,
  characteristic_id: Number,
  review_id: Number,
  value: Number
})
const Characteristics = mongoose.model('Characteristics', characteristicsSchema);
const CharacteristicsReviews = mongoose.model('CharacteristicsReviews', characteristicReviewsSchema);

const Reviews = mongoose.model('Reviews', reviewSchema);

module.exports = {
  Reviews,
  Characteristics,
  CharacteristicsReviews,
  Photos
}