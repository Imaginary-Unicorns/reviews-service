const mongoose = require('mongoose');
const chars = require("../chars.js");
const revs = require("../revs.js");
const phots = require("../phots.js");

/*
MODELS
*/
const Characteristics = chars.conn.model('Characteristics', chars.characteristicsSchema);
const CharacteristicsReviews = chars.conn.model('CharacteristicsReviews', chars.characteristicReviewsSchema);
const Reviews = revs.conn.model('Reviews', revs.reviewSchema);
const Photos = phots.conn.model('Photos', phots.photoSchema);

const getAllReviews = (req, res, callback)=> {
  let pipeline = [
    {
      $match: {
        'product_id': Number.parseInt(req.query.product_id)
      }
    },
    {
      $lookup: {
        from: 'photos',
        localField: 'review_id',
        foreignField: 'review_id',
        as: 'photos'
      }
    },
    {
      $project: {
        _id: 0,
        images: 0
      }
    },
    {
      $limit: Number.parseInt(req.query.count)
    }
  ];
  return Reviews.aggregate(pipeline).exec()
    .then(data => callback(data))
}

const getMeta = (req, res, callback) => {
  let pipeline = [
    {
      $match: {
        'product_id': Number.parseInt(req.query.product_id)
      }
    },
    {
      $lookup: {
        from: 'characteristicsreviews',
        localField: 'characteristic_id',
        foreignField: 'characteristic_id',
        as: 'chars'
      }
    },
    {
      $lookup: {
        from: 'reviews',
        localField: 'product_id',
        foreignField: 'product_id',
        as: 'reviewData'
      }
    },
    {
      $addFields: {
        placeholderChars: {
          $map: {
            input: '$chars',
            as: 'char',
            in: '$$char.value'
          }
        },
        rating: {
          $map: {
            input: '$reviewData',
            as: 'rate',
            in: '$$rate.rating'
          }
        },
        recommendations: {
          $map: {
            input: '$reviewData',
            as: 'rate',
            in: '$$rate.recommend'
          }
        }
      }
    },
    {
      $group: {
        product_id: 1,
        id: '$characteristic_id',
        name: 1,
        placeholderChars: 1,
        rating: 1,
        recommendations: 1
      }
    }
  ];
  Characteristics.aggregate(pipeline).exec()
    .then(data => {
      console.log('rawData', data);
      console.log('characteristics', data[0].chars);
      console.log('reviews', data[0].reviewData);
      console.log('reviews', data[0].characteristics);
    })
}

const saveReview = (req, res, callback) => {
  console.log('new review data: ', req.body)
  Reviews.count().then(data => {
    let newReview = new Reviews({
      product_id: req.body.product_id,
      review_id: data + 1,
      summary: req.body.summary,
      rating: req.body.rating,
      recommend: req.body.recommend,
      response: req.body.response,
      body: req.body.body,
      date: req.body.date,
      reviewer_name: req.body.reviewer_name,
      reviewer_email: req.body.reviewer_email,
      helpfulness: req.body.helpfulness,
      reported: req.body.reported
    })
    newReview.save().then(confirm => {
      if (req.body.photos.length > 0) {
        let newPhotos = new Photos({
          review_id: data + 1,
          photos: req.body.photos
        })
        newPhotos.save().then(sent => {
          console.log('New Review Saved.', confirm, sent)
          res.status(200).send('New Review Saved.')
        })
      } else {
        console.log('New review saved with no photos.')
        res.send(200)
      }
    });
  })
}

module.exports = {
  getAllReviews,
  getMeta,
  saveReview
}