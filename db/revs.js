const mongoose = require('mongoose');
// main().catch(err => console.log(err));
// async function main() {
  const conn = mongoose.createConnection('mongodb://52.204.197.248/allReviews')
  .once('open', ()=> console.log(`Connected to allReviews DB`));
// };
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
  rating: Number,
  body: String,
  date: Date,
  reviewer_name: String,
  reviewer_email: String,
  helpfulness: Number,
  reported: Boolean,
  photos: [],
  characteristics: {
    size: Number,
    width: Number,
    comfort: Number,
    quality: Number,
    length: Number,
    fit: Number
  }
})

reviewSchema.index({product_id:1})

const Reviews = mongoose.model('Reviews', reviewSchema);

module.exports = {
  conn,
  reviewSchema
}