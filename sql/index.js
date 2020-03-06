const fs = require('fs');
const path = require('path');

module.exports = { getListBdays: fs.readFileSync(path.resolve(__dirname, 'getListBdays.sql')).toString() };
