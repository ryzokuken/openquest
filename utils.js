const fs = require('fs');
const jsonfile = require('jsonfile');

const worldFilePath = './data/world.json'

function createWorldFile() {
  fs.openSync(worldFilePath, 'w');
}

function generateNewWorld() {
  return {
    'player': {
      'hp': [100, 100],
      'mp': [40, 40]
    }
  };
}

function saveWorld(world) {
  console.log("Saving data to disk");
  try {
    jsonfile.writeFileSync(worldFilePath, world, {spaces: 2});
  } catch (err) {
    if (err.code === 'ENOENT') {
      createWorldFile();
      jsonfile.writeFileSync(worldFilePath, world, {spaces: 2});
    } else {
      return console.error(err);
    }
  }
  console.log("Saved successfully");
  return world;
}

function loadWorld() {
  console.log("Loading saved game")
  try {
    return jsonfile.readFileSync(worldFilePath)
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log("Save not found, creating new game")
      return generateNewWorld();
    } else {
      console.error(err);
      return false;
    }
  }
}

module.exports = { saveWorld, loadWorld};
