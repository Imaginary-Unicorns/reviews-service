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

let photos = fs.createReadStream('/Users/ojeikuaisiku/Documents/HackReactor/SDC/reviews-service/photos/reviews_photos-6.csv');

let count = 0
photos.pipe(parse({delimiter: ','})).on('data', data => {
  let newPhoto = new Photos({
    review_id: data.review_id,
    url: data.url
  })
  newPhoto.save()
  .then(data => {
  })
  .catch(err => console.error(err))
})