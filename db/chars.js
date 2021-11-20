const mongoose = require('mongoose');
const conn = mongoose.createConnection('mongodb://52.204.197.248:27017/allReviews')
    .once('open', ()=> console.log(`Connected to Characteristics`));
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

characteristicsSchema.index({product_id:1})
characteristicReviewsSchema.index({review_id:1})

const Characteristics = mongoose.model('Characteristics', characteristicsSchema);
const CharacteristicsReviews = mongoose.model('CharacteristicsReviews', characteristicReviewsSchema);

module.exports = {
  conn,
  characteristicsSchema,
  characteristicReviewsSchema
}