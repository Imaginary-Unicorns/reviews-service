const mongoose = require('mongoose');
const conn = mongoose.createConnection('mongodb://localhost:27017/allReviews')
    .once('open', ()=> console.log(`Connected to Photos DB`));
const fs = require('fs');
const parse = require('csv-parser')

const photoSchema = new mongoose.Schema({
  review_id: Number,
  url: String
})

photoSchema.index({review_id:1})

const Photos = mongoose.model('Photos', photoSchema);

module.exports = {
  conn,
  photoSchema
}