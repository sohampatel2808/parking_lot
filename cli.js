const yargs = require('yargs');
const parkingLot = require('./app/parking-lot');
const utils = require('./app/utils');

yargs.command({
  command: 'create',
  describe: 'Command for creating a parking lot',
  builder: {
    spots: utils.getYargsSlotsConfig()
  },
  handler: (argv) => {
    parkingLot.create(argv.spots);
  }
});

yargs.command({
  command: 'park',
  describe: 'Command for parking a vehicle',
  builder: {
    licenseplate: utils.getYargsLicensePlateConfig(),
    color: utils.getYargsColorConfig()
  },
  handler: (argv) => {
    parkingLot.parkVehicle(argv.licenseplate, argv.color);
  }
});

yargs.command({
  command: 'unpark',
  describe: 'Command for removing a vehicle from parking lot',
  builder: {
    licenseplate: utils.getYargsLicensePlateConfig()
  },
  handler: (argv) => {
    parkingLot.unparkVehicle(argv.licenseplate);
  }
});

yargs.command({
  command: 'licenseplatebycolor',
  describe: 'Command for fetching all license plate by color of the vehicle',
  builder: {
    color: utils.getYargsColorConfig()
  },
  handler: (argv) => {
    parkingLot.filterVehicle(argv.color, utils.getVehicleColor, utils.getVehicleLicensePlate);
  }
});

yargs.command({
  command: 'ticketnumberbylicenseplate',
  describe: 'Command for fetching a ticket number by license plate of the vehicle',
  builder: {
    licenseplate: utils.getYargsLicensePlateConfig()
  },
  handler: (argv) => {
    parkingLot.filterVehicle(argv.licenseplate, utils.getVehicleLicensePlate, utils.getTicketNumber);
  }
});

yargs.command({
  command: 'ticketnumberbycolor',
  describe: 'Command for fetching all ticket numbers by color of the vehicle',
  builder: {
    color: utils.getYargsColorConfig()
  },
  handler: (argv) => {
    parkingLot.filterVehicle(argv.color, utils.getVehicleColor, utils.getTicketNumber);
  }
});

yargs.parse();
