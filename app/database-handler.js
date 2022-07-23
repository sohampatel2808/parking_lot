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
        reject('Error in file parsing!');
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
