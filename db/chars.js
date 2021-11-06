const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://localhost:27017/characteristics');
};
const fs = require('fs');
const parse = require('csv-parser')

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

module.exports = {
  Characteristics,
  CharacteristicsReviews
}