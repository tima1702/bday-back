const models = require('../models');
const dateUtil = require('../util/date');
var sql = require('../sql');

const BdayModel = models.Bday;

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

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

async function getAll() {
  try {
    const months = await models.sequelize.query(sql.getListBdays, { type: models.Sequelize.QueryTypes.SELECT });

    const newMonths = {};

    months.forEach((item, i) => {
      newMonths[monthNames[i]] = item.month ? item.month : [];
    });

    return newMonths;
  } catch (e) {
    return new Error('error get list');
  }
}

module.exports = {
  create,
  getAll,
};
