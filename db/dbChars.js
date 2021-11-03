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

const Reviews = mongoose.model('Reviews', reviewSchema);

let characteristics = fs.createReadStream('characteristics.csv');
let characteristicReviews = fs.createReadStream('characteristic_reviews.csv');

let count = 0;
characteristics.pipe(parse({delimiter: ','})).on('data', data => {
  console.log(count);
  count++;
  characteristicReviews.pipe(parse({delimiter: ','})).on('data', fileData => {
    if (data.id === fileData.characteristic_id) {
      const filter = { 'product_id': data.product_id };
      if (data.name === 'Size') {
        const update = { '$set': { 'characteristics': { 'size': fileData.value } }};
        const options = { returnNewDocument: true };
        Reviews.findOne(filter)
        .then(data => {
          data.characteristics.size = fileData.value;
          data.save();
        });
      }
      if (data.name === 'Width') {
        const update = { '$set': { 'characteristics': { 'width': fileData.value } }};
        const options = { returnNewDocument: true };
        Reviews.findOne(filter)
        .then(data => {
          data.characteristics.width = fileData.value;
          data.save();
        });
      }
      if (data.name === 'Comfort') {
        const update = { '$set': { 'characteristics': { 'comfort': fileData.value } }};
        const options = { returnNewDocument: true };
        Reviews.findOne(filter)
        .then(data => {
          data.characteristics.comfort = fileData.value;
          data.save();
        });
      }
      if (data.name === 'Quality') {
        const update = { '$set': { 'characteristics': { 'quality': fileData.value } }};
        const options = { returnNewDocument: true };
        Reviews.findOne(filter)
        .then(data => {
          data.characteristics.quality = fileData.value;
          data.save();
        });
      }
      if (data.name === 'Length') {
        const update = { '$set': { 'characteristics': { 'length': fileData.value } }};
        const options = { returnNewDocument: true };
        Reviews.findOne(filter)
        .then(data => {
          data.characteristics.length = fileData.value;
          data.save();
        });
      }
      if (data.name === 'Fit') {
        const update = { '$set': { 'characteristics': { 'fit': fileData.value } }};
        const options = { returnNewDocument: true };
        Reviews.findOne(filter)
        .then(data => {
          data.characteristics.fit = fileData.value;
          data.save();
        });
      }
    }
  });
});