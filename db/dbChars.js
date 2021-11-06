const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://localhost:27017/reviews');
};
const fs = require('fs');
const parse = require('csv-parser')

const characteristicsSchema = new mongoose.Schema({
  characteristic_id: Number,
  product_id: Number,
  name: String,
})
const Characteristics = mongoose.model('Characteristics', characteristicsSchema);

let characteristics = fs.createReadStream('/Users/ojeikuaisiku/Documents/HackReactor/SDC/reviews-service/chars/characteristics-17.csv');

characteristics.pipe(parse({delimiter: ','})).on('data', data => {
  let newChar = new Characteristics({
    characteristic_id: data.id,
    product_id: data.product_id,
    name: data.name,
  })
  newChar.save()
})
/*
characteristics.pipe(parse({delimiter: ','})).on('data', data => {
  characteristicReviews.pipe(parse({delimiter: ','})).on('data', fileData => {
    console.log(data.id, fileData.characteristic_id, data.id === fileData.characteristic_id)
      let newChar = new Characteristics({
        product_id: data.product_id,
        review_id: fileData.review_id,
        name: data.name,
        value: fileData.value
      })
      console.log(newChar)
      newChar.save().then(data => console.log('saved')).catch(err => console.error(err));
  });
})
*/