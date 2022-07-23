const yargs = require('yargs');
const parkingLot = require('./app/parking-lot');

yargs.command({
  command: 'create',
  describe: 'Command for creating a parking lot',
  builder: {
    spots: {
      describe: 'Number of slots present in the parking lot',
      demandOption: true,
      type: 'number'
    }
  },
  handler: (argv) => {
    parkingLot.create(argv.spots);
  }
});

yargs.command({
  command: 'park',
  describe: 'Command for parking a car',
  builder: {
    licenseplate: {
      describe: 'License plate plate of the car',
      demandOption: true,
      type: 'string'
    },
    color: {
      describe: 'Color of the car',
      demandOption: true,
      type: 'string'
    }
  },
  handler: (argv) => {
    parkingLot.parkVehicle(argv.licenseplate, argv.color);
  }
});

yargs.parse();
