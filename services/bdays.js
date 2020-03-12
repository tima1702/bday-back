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
    throw new Error('error create');
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
    throw new Error('error get list');
  }
}

async function deleteRecord(recordId) {
  try {
    const result = await BdayModel.destroy({ where: { id: recordId } });
    if (result === 0) throw new Error('not modify');
  } catch (e) {
    throw new Error('error delete');
  }
}

async function updateRecord(recordId, firstName, lastName, date, data) {
  try {
    const record = await BdayModel.findOne({ where: { id: recordId } });

    const updatedRecord = await record.update({
      firstName,
      lastName,
      data,
      date: date * 1000,
    });

    if (!record) throw new Error('record not found');

    return {
      id: updatedRecord.dataValues.id,
      firstName: updatedRecord.dataValues.firstName,
      lastName: updatedRecord.dataValues.lastName,
      date: updatedRecord.dataValues.date,
      data: updatedRecord.dataValues.data,
      month: dateUtil.getMonthName(date),
    };
  } catch (e) {
    throw new Error('error update');
  }
}

async function getById(id, args = {}) {
  try {
    return await BdayModel.findOne({ where: { id }, ...args });
  } catch (e) {
    throw new Error('error query by id');
  }
}

module.exports = {
  create,
  getAll,
  deleteRecord,
  updateRecord,
  getById,
};
