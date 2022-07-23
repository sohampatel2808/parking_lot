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
  describe: 'Command for parking a car',
  builder: {
    licenseplate: utils.getYargsLicensePlateConfig(),
    color: utils.getYargsColorConfig()
  },
  handler: (argv) => {
    parkingLot.parkVehicle(argv.licenseplate, argv.color);
  }
});

yargs.command({
  command: 'licenseplatebycolor',
  describe: 'Command for fetching all license plate by color',
  builder: {
    color: utils.getYargsColorConfig()
  },
  handler: (argv) => {
    parkingLot.filterVehicle(argv.color, utils.getVehicleColor, utils.getVehicleLicensePlate);
  }
});

yargs.command({
  command: 'ticketnumberbylicenseplate',
  describe: 'Command for parking a car',
  builder: {
    licenseplate: utils.getYargsLicensePlateConfig()
  },
  handler: (argv) => {
    parkingLot.filterVehicle(argv.licenseplate, utils.getVehicleLicensePlate, utils.getTicketNumber);
  }
});

yargs.command({
  command: 'ticketnumberbycolor',
  describe: 'Command for parking a car',
  builder: {
    color: utils.getYargsColorConfig()
  },
  handler: (argv) => {
    parkingLot.filterVehicle(argv.color, utils.getVehicleColor, utils.getTicketNumber);
  }
});

yargs.parse();
