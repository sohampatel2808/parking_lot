const dotenv = require('dotenv');
const fs = require('fs')
dotenv.config();

exports.loadData = function() {
  return new Promise((resolve, reject) => {
    fs.readFile(process.env.FILE_PATH_PARKING_LOT, (err, data) => {
      if (err) reject(err);

      try {
        resolve(JSON.parse(data.toString()));
      } catch (ex) {
        reject('No parking lot data found, please create a parking lot first!');
      }
    });
  });
}

exports.saveData = function(data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(process.env.FILE_PATH_PARKING_LOT, JSON.stringify(data), (err) => {
      if (err) reject(err);

      resolve('Data saved successfully!');
    });
  });
}
