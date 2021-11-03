const fs = require('fs');

const csvToDB = (str, delimiter = ',') => {
  // console.log(str)
  const headers = str.slice(0, str.indexOf('\n')).split(delimiter);
  const rows = str.slice(str.indexOf('\n') + 1).split('\n');

  const arr = rows.map(row => {
    const values = row.split(delimiter);
    const el = headers.reduce((obj, header, index) => {
      obj[header] = values[index];
      return obj;
    }, {});
    return el;
  });
  return arr;
}

const addPhotos = () => {
  fs.readFile('testphotos.csv', 'utf8', (err, data) => {
    if (err) {
      return err;
    } else {
      const result = csvToDB(data);
      result.map((result, i) => {
        if (res.review_id.toString() === result.review_id.toString()) {
          if (res.photos) {
            res.photos.push(result.url)
          } else {
            res.photos = [result.url];
          }
          // Reviews.create(res, (err)=>{ if (err) { return err; }});
        } else {
          // Reviews.create(res, (err)=>{ if (err) { return err; }});
        }
      })
      return;
    }
  });
}

const addChars = (datum) => {
  let obj = {};
  fs.readFile('testCharRevs', 'utf8', (err, charRev) => {
    if (err) {
      return err;
    } else {
      const cRev = csvToDB(charRev);
      fs.readFile('testChars', 'utf8', (err, char) => {
        if (err) {
          return err;
        } else {
          const characteristics = csvToDB(char);
          characteristics.map(characteristic => {
            // obj.id = characteristic.product_id;
            crev.map(rev => {
              if (characteristic.id.toString() === rev.characteristic_id.toString()) {
                obj[characteristic.name] = rev.value;
              }
            })
            if (characteristic.product_id === datum.product_id) {
              datum.characteristics = characteristic;
            }
          })
        }
      })
    }
  })
}

// fs.readFile('testreviews.csv', 'utf8', (err, data) => {
//   if (err) {
//     return err;
//   } else {
//     const result = csvToDB(data);
//     result.map((res, i) => {
//       res.review_id = i + 1;
//       // Reviews.create({review_id: i, res}, (err)=>{ if (err) { return err; }});

//     })
//   }
// })

module.exports = {
  csvToDB,
  addPhotos,
  addChars
}