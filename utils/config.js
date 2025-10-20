const fs = require('fs');
const path = require('path');

const CONFIG_PATH = path.join(__dirname, '../config/config.json');

let config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));

function getConfig(key) {
  if (key) return config[key];
  return config;
}

function setConfig(key, value) {
  config[key] = value;
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
}

module.exports = { getConfig, setConfig };
