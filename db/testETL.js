const fs = require('fs');
const csv = require('csvtojson');
const streamToMongoDB = require('stream-to-mongo-db').streamToMongoDB;

const csvFile = '/Users/ojeikuaisiku/Documents/HackReactor/SDC/reviews-service/reviews.csv';
const dbURL = 'mongodb://localhost:27017/tweets';
const collection = 'tweets';

fs.createReadStream(csvFile)
  .pipe(csv())
  .pipe(streamToMongoDB({
  	dbURL : dbURL, collection : collection
  }))