const { nanoid } = require('nanoid');
const db = require('./database-handler');
const logger = require('./logger');
const utils = require('./utils');

exports.create = async (spotsCount = 0) => {
  try {
    const data = { parkingSpots: spotsCount, spots: [] };
    const response = await db.saveData(data);
    logger.log(response);
  } catch (ex) {
    logger.logError(ex);
  }
}

exports.parkVehicle = async (licenseplate = '', color = '') => {
  try {
    const data = await db.loadData();

    if (data.spots.length >= data.parkingSpots) {
      logger.logWarn('Parking spot not available!');
      return;
    }

    if (utils.isDuplicateVehicle(data.spots, licenseplate)) {
      logger.logWarn('Vehicle with this license plate already present!');
      return;
    }

    const vehicle = { ticket: { number: nanoid(), entryTime: Date.now() }, licenseplate, color };
    data.spots.push({ id: data.spots.length + 1, vehicle });
    const response = await db.saveData(data);
    logger.log(response);
  } catch (ex) {
    logger.logError(ex);
  }
}

exports.filterVehicle = async (searchValue, getKeyLogic, getValueLogic) => {
  const data = await db.loadData();
  const result = utils.filterVehicle(data.spots, searchValue, getKeyLogic, getValueLogic);
  console.log(result);
}
