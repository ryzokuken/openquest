const utils = require('./utils');

let world = utils.loadWorld();

if (world == false) {
  process.exit();
}

console.log(world);

utils.saveWorld(world);
