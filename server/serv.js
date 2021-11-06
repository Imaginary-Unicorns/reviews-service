require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const database = require("../db/database.js");
// const chars = require("../db/chars.js");
const port = 3333;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/test', (req, res) => {
  res.send('success')
})

app.get('/reviews', (req, res) => {
  let obj = {};
  let count;
  // console.log('query', req.query, typeof req.query.count)
  count = Number.parseInt(req.query.count, 10);
  database.Reviews.find({ product_id: req.query.product_id }).lean().limit(count)
  .then(async reviews => {
    // console.log('reviews', reviews)
    obj.results = reviews
    // console.log(obj)
    // res.send(obj)
  })
  .then(async reviews => {
    obj.results.map(review => {
      database.Photos.find({review_id: 325}).then(photos => {
        return review.photos = photos
      });
      // database.Photos.count({}, (err, count) => console.log('photos', count))
    });
    return obj
  })
  .then(revs => {
    // console.log('this is it', revs)
    res.send(revs);
  })
  .catch(err => res.send(err))
})

app.get('/reviews/meta', (req, res) => {
  // let obj = {};
  // let count;
  // console.log('query', req.query, typeof req.query.count)
  // count = Number.parseInt(req.query.count, 10);
  database.CharacteristicsReviews.count({}, (err, count) => {
    console.log(count)
  })
  // .then(data => {
  //   console.log('mete', data)
  //   res.send(data)
  // })
  // .then(async reviews => {
  //   obj.map(review => {
  //     database.Photos.find({review_id: review.review_id}).then(photos => review.photos = photos);
  //   });
  //   await res.send(obj);
  // })
  .catch(err => res.send(err))
})

module.exports = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});