const env = require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const database = require("../db/database.js");

// mongoose.connect(process.env.mongoReviewsURI);
// app.use()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  console.log('testing...')
  res.send('test')
})

app.get('/test', (req, res) => {
  console.log('test worked')
  res.send('success')
})

app.get('/reviews', (req, res) => {
  console.log('test')
  res.send('test')
  // console.log(req);
  // let obj = [];
  // database.Reviews.find({ product_id: req.query.product_id })
  // .then(reviews => obj = reviews)
  // .then(async reviews => {
  //   obj.map(review => {
  //     database.Photos.find({review_id: review.review_id}).then(photos => review.photos = photos);
  //   });
  //   await res.send(obj);
  // })
});

app.get('/reviews/meta');

app.post('/reviews');

app.put('/reviews');


app.listen(4000, ()=>{
  console.log(`Listening on port: ${4000}`);
});

// process.on(‘SIGINT’, () => { console.log(“exiting…“); process.exit(); });

// process.on(‘exit’, () => { console.log(“exiting…“); process.exit(); });