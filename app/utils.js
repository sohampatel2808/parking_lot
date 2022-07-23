
exports.isDuplicateVehicle = (spots, licenseplate) => {
  return spots.find((spot) => spot.vehicle.licenseplate.toLowerCase() === licenseplate.toLowerCase());
}

exports.getVehicleColor = (vehicle) => {
  return vehicle.color || '';
}

exports.getVehicleLicensePlate = (vehicle) => {
  return vehicle.licenseplate || '';
}

exports.getTicketNumber = (vehicle) => {
  return vehicle.ticket.number || '';
}

exports.filterVehicle = (spots, searchValue, getKeyLogic, getValueLogic) => {
  let result = [];

  spots.forEach((spot) => {
    if (getKeyLogic(spot.vehicle).toLowerCase() === searchValue.toLowerCase()) {
      result.push(getValueLogic(spot.vehicle));
    }
  });

  return result;
}
