const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://localhost:27017/reviews');
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
  reported: Boolean,
  photos: [String],
  characteristics: {
    review_id: Number,
    rating: Number,
    size: Number,
    width: Number,
    comfort: Number,
    quality: Number,
    length: Number,
    fit: Number
  }
})

const photoSchema = new mongoose.Schema({
  review_id: Number,
  url: String
})

const characteristicsSchema = new mongoose.Schema({
  review_id: Number,
  rating: Number,
  size: Number,
  width: Number,
  comfort: Number,
  quality: Number,
  length: Number,
  fit: Number
})

const Reviews = mongoose.model('Reviews', reviewSchema);
const Characteristics = mongoose.model('Characteristics', characteristicsSchema);
const Photos = mongoose.model('Photos', photoSchema);

module.exports = {
  Reviews,
  Characteristics,
  Photos
}