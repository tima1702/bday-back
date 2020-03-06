const BdayModel = require('../models').Bday;
const dateUtil = require('../util/date');

async function create(firstName, lastName, date, data) {
  try {
    const result = await BdayModel.create({
      firstName,
      lastName,
      date: date * 1000,
      data,
    });

    return {
      id: result.dataValues.id,
      firstName: result.dataValues.firstName,
      lastName: result.dataValues.lastName,
      date: result.dataValues.date,
      data: result.dataValues.data,
      month: dateUtil.getMonthName(date),
    };
  } catch (e) {
    return new Error('error create');
  }
}

async function getAll() {
  return {
    January: [],
    February: [
      {
        fullName: 'Тимофей Кузнеов',
        day: 17,
        data: {
          // any from json
        },
      },
    ],
    March: [],
    April: [],
    May: [],
  };
}

module.exports = {
  create,
  getAll,
};
