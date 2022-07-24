const { nanoid } = require('nanoid');
const db = require('./database-handler');
const logger = require('./logger');
const utils = require('./utils');

exports.create = async (spotsCount = 0) => {
  try {
    const data = {
      parkingSpots: spotsCount,
      availableSpotIds: getInitialSpotIds(spotsCount),
      occupiedSpots: []
    };
    const response = await db.saveData(data);

    logger.log('Parking lot created successfully!');
  } catch (ex) {
    logger.logError(ex);
  }
}

exports.parkVehicle = async (licenseplate = '', color = '') => {
  try {
    if (licenseplate === '' || color === '') {
      logger.logWarn('Please provide license plate or color for the vehicle!');
      return;
    }

    const data = await db.loadData();

    if (!isParkingSpotAvailable(data, licenseplate)) return;

    const newSpotData = {
      id: data.availableSpotIds.pop(),
      vehicle: { ticket: { number: nanoid(), entryTime: Date.now() }, licenseplate, color }
    }
    data.occupiedSpots.push(newSpotData);
    const response = await db.saveData(data);

    logger.log('Vehicle parked successfully!');
  } catch (ex) {
    logger.logError(ex);
  }
}

exports.filterVehicle = async (searchValue = '', getKeyLogic, getValueLogic) => {
  try {
    if (searchValue === '') {
      logger.logWarn('Please provide search value!');
      return;
    }

    const data = await db.loadData();

    let filteredArray = [];
    data.occupiedSpots.forEach((spot) => {
      if (getKeyLogic(spot.vehicle).toLowerCase() === searchValue.toLowerCase()) {
        filteredArray.push(getValueLogic(spot.vehicle));
      }
    });

    filteredArray.length > 0
      ? logger.logTable(filteredArray) 
      : logger.logWarn('No data found for this particular query!');
  } catch (ex) {
    logger.logError(ex);
  }
}

exports.unparkVehicle = async (licenseplate = '') => {
  try {
    if (licenseplate === '') {
      logger.logWarn('Please provide license plate!');
      return;
    }

    const data = await db.loadData();
    const vehicleIndex = data.occupiedSpots.findIndex((spot) => {
      return utils.getVehicleLicensePlate(spot.vehicle).toLowerCase() === licenseplate.toLowerCase();
    });

    if (vehicleIndex === -1) {
      logger.logWarn('No vehicle with this license plate found!');
      return;
    }

    const removedVehicle = data.occupiedSpots.splice(vehicleIndex, 1);
    data.availableSpotIds.push(removedVehicle[0].id);
    data.availableSpotIds.sort((a, b) => b - a);
    const response = await db.saveData(data);

    logger.log('Unparked vehicle successfully!');
  } catch (ex) {
    logger.logError(ex);
  }
}

function isParkingSpotAvailable(data, licenseplate) {
  if (data.availableSpotIds <= 0) {
    logger.logWarn('Parking spot not available!');
    return false;
  }

  const duplicateVehicle = data.occupiedSpots.find((spot) => {
    const currentLicensePlate = utils.getVehicleLicensePlate(spot.vehicle);
    return currentLicensePlate.toLowerCase() === licenseplate.toLowerCase();
  });
  if (duplicateVehicle) {
    logger.logWarn('Vehicle with this license plate already present!');
    return false;
  }

  return true;
}

function getInitialSpotIds(spotsCount) {
  let arrayIds = []

  for (let i = spotsCount - 1; i >= 0; i--) {
    arrayIds.push(i);
  }

  return arrayIds;
}
