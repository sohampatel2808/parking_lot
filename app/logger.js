const chalk = require('chalk');

exports.log = (message) => {
  console.log(chalk.green.bold(message));
}

exports.logWarn = (message) => {
  console.log(chalk.yellow.bold(message));
}

exports.logError = (message) => {
  console.log(chalk.red.bold(message));
}

exports.logTable = (array) => {
  console.table(array);
}
