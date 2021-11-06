const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://localhost:27017/photos');
};
const fs = require('fs');
const parse = require('csv-parser')

const photoSchema = new mongoose.Schema({
  review_id: Number,
  url: String
})
const Photos = mongoose.model('Photos', photoSchema);

module.exports = Photos