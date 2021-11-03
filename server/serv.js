require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const database = require("../db/database.js");

app.get('/test', (req, res) => {
  res.send('success')
})

app.get('/reviews', (req, res) => {
  let obj = {};
  console.log('query', req.query)
  database.Reviews.find({ product_id: req.query.product_id })
  .then(async reviews => {
    console.log('reviews', reviews)
    obj.results = reviews
    setTimeout(()=>{
      res.send(obj)
    }, 15000)
  })
  // .then(async reviews => {
  //   obj.map(review => {
  //     database.Photos.find({review_id: review.review_id}).then(photos => review.photos = photos);
  //   });
  //   await res.send(obj);
  // })
  .catch(err => res.send(err))
})

app.listen(4000, () => {
  console.log(`Listening at http://localhost:${4000}`);
});