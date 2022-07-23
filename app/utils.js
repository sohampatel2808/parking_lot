
exports.getVehicleColor = (vehicle) => {
  return vehicle.color || '';
}

exports.getVehicleLicensePlate = (vehicle) => {
  return vehicle.licenseplate || '';
}

exports.getTicketNumber = (vehicle) => {
  return vehicle.ticket.number || '';
}

exports.getFilterValue = (spots, searchValue, getKeyLogic, getValueLogic) => {
  let result = [];

  spots.forEach((spot) => {
    if (getKeyLogic(spot.vehicle).toLowerCase() === searchValue.toLowerCase()) {
      result.push(getValueLogic(spot.vehicle));
    }
  });

  return result;
}

exports.getYargsSlotsConfig = () => {
  return {
    describe: 'Number of slots present in the parking lot',
    demandOption: true,
    type: 'number'
  }
}

exports.getYargsLicensePlateConfig = () => {
  return {
    describe: 'License plate plate of the car',
    demandOption: true,
    type: 'string'
  }
}

exports.getYargsColorConfig = () => {
  return {
    describe: 'Color of the car',
    demandOption: true,
    type: 'string'
  }
}
