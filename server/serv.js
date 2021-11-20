require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const controllers = require("../db/controllers/controllers.js");
const chars = require("../db/chars.js");
const revs = require("../db/revs.js");
const phots = require("../db/phots.js");
const port = 3333;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*
MODELS
*/
const Characteristics = chars.conn.model('Characteristics', chars.characteristicsSchema);
const CharacteristicsReviews = chars.conn.model('CharacteristicsReviews', chars.characteristicReviewsSchema);
const Reviews = revs.conn.model('Reviews', revs.reviewSchema);
const Photos = phots.conn.model('Photos', phots.photoSchema);

app.get('/', (req, res) => res.sendStatus(200))

app.get('/reviews', (req, res) => {
  console.log('getting reviews for client')
  controllers.getAllReviews(req, res, (data) => {
    console.log('successful from deployment', data)
    res.status(200).send({ results: data })
  })
  // result.then(data => console.log(data))
})

app.get('/reviews/meta', (req, res) => {
  controllers.getMeta(req, res, data => {
    res.status(200)
  })
})

app.post('/reviews', (req, res) => {
  controllers.saveReview(req, res, data => {
    console.log(data)
    res.status(200).send(data)
  })
})

app.put('/reviews/*/helpful', (req, res) => {
  Reviews.findOneAndUpdate({review_id: req.body.review_id}, {$inc : {'helpfulness' : 1}})
    .then(end => res.status(200).send('OK'))
  })

app.put('/reviews/*/report', (req, res) => {
  console.log('reporting...', req.body)
  Reviews.findOneAndUpdate({review_id: req.body.review_id}, {$set: {reported: true}}, (err, end) => {
    res.status(200).send('OK');
  });
})

module.exports = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});