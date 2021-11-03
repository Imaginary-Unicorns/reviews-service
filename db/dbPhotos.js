const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://localhost:27017/photos');
};
const fs = require('fs');
const parse = require('csv-parser')
// import { csvToDB } from 'csvToDB';

// id,product_id,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness

const photoSchema = new mongoose.Schema({
  review_id: Number,
  url: String
})

const Photos = mongoose.model('Photos', photoSchema);
let photos = fs.createReadStream('/Users/ojeikuaisiku/Documents/HackReactor/SDC/reviews-service/reviews_photos-2.csv');

photos.pipe(parse({delimiter: ','})).on('data', data => {
  // console.log(data);
  let newPhoto = new Photos({
    review_id: data.review_id,
    url: data.url
  })
  newPhoto.save().then(savedDoc => console.log(savedDoc.review_id));
  // const result = csvToDB(data);
  // console.log(result);
})

module.exports = {
  Photos
}