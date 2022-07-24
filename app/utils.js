
exports.getVehicleColor = (vehicle) => {
  return vehicle.color || '';
}

exports.getVehicleLicensePlate = (vehicle) => {
  return vehicle.licenseplate || '';
}

exports.getTicketNumber = (vehicle) => {
  return vehicle.ticket.number || '';
}

exports.getYargsSpotsConfig = () => {
  return {
    describe: 'Number of spots present in the parking lot',
    demandOption: true,
    type: 'number'
  }
}

exports.getYargsLicensePlateConfig = () => {
  return {
    describe: 'License plate of the vehicle',
    demandOption: true,
    type: 'string'
  }
}

exports.getYargsColorConfig = () => {
  return {
    describe: 'Color of the vehicle',
    demandOption: true,
    type: 'string'
  }
}
