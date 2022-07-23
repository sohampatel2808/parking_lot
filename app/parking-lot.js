const { nanoid } = require('nanoid');
const db = require('./database-handler');
const logger = require('./logger');

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

    if (isDuplicateVehicle(data.spots, licenseplate)) {
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

function isDuplicateVehicle(spots, licenseplate) {
  return spots.find((spot) => spot.vehicle.licenseplate.toLowerCase() === licenseplate.toLowerCase());
}
