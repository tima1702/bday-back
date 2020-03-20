const fs = require('fs');
const path = require('path');
const procedure = require('./procedure');

module.exports = { procedure, getListBdays: fs.readFileSync(path.resolve(__dirname, 'getListBdays.sql')).toString() };
