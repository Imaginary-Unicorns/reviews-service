const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://localhost:27017/newreviews');
};
const fs = require('fs');
const parse = require('csv-parser')

const characteristicReviewsSchema = new mongoose.Schema({
  placeholder_id: Number,
  characteristic_id: Number,
  review_id: Number,
  value: Number
})
const CharacteristicsReviews = mongoose.model('CharacteristicsReviews', characteristicReviewsSchema);

let characteristics = fs.createReadStream('/Users/ojeikuaisiku/Documents/HackReactor/SDC/reviews-service/CharRevs/characteristic_reviews-39.csv');

characteristics.pipe(parse({delimiter: ','})).on('data', data => {
  let newReview = new CharacteristicsReviews({
    placeholder_id: data.id,
    characteristic_id: data.characteristic_id,
    review_id: data.review_id,
    value: data.value
  })
  newReview.save()
  .catch(err => {
    console.error(err)
  })
})

characteristics.on('end', ()=> console.log('done.'))

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