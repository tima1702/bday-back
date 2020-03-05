const BdayModel = require('../models/bday');

async function create(fistName, lastName, date, fields) {
  console.log('..........', fistName, lastName, date, fields, BdayModel);
  // create with models BdayModel
  const month = 'February';
  return {
    fistName, lastName, date, fields, month,
  };
}

async function getAll() {
  return {
    January: [],
    February: [{
      fullName: 'Тимофей Кузнеов',
      day: 17,
      fields: {
        // any from json
      },
    }],
    March: [],
    April: [],
    May: [],
  };
}

module.exports = {
  create,
  getAll,
};
