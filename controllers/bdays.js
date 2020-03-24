const responseSuccess = require('../util/responseSuccess');
const dateUtil = require('../util/date');
const text = require('../util/text');
const BdaysService = require('../services/bdays');
const customError = require('../util/customError');

class Bdays {
  async getAll(req, res) {
    const data = await BdaysService.getAll();

    const response = responseSuccess.query(data);
    res.status(response.status).json(response.body);
  }

  async getById(req, res) {
    const record = await BdaysService.getByIdBasicData(req.params.id);

    if (!record) throw customError.query('not found');

    const response = responseSuccess.query({
      ...record.dataValues,
      date: dateUtil.getDateStringDefaultFormat(record.dataValues.date),
    });
    res.status(response.status).json(response.body);
  }

  async deleteRecord(req, res) {
    const countRecords = await BdaysService.deleteRecord(req.params.id);

    if (!countRecords) throw customError.delete();

    const response = responseSuccess.delete(countRecords);
    res.status(response.status).json(response.body);
  }

  async updateRecord(req, res) {
    const { id } = req.params;
    const { firstName, lastName, date, data } = req.body;
    const row = await BdaysService.updateRecord(
      id,
      text.compositeLetterUpperCase(firstName),
      text.compositeLetterUpperCase(lastName),
      date,
      data,
    );

    if (!row) throw customError.update();

    const response = responseSuccess.update(row);
    res.status(response.status).json(response.body);
  }

  async create(req, res) {
    const { firstName, lastName, date, data } = req.body;
    const record = await BdaysService.create(
      text.compositeLetterUpperCase(firstName),
      text.compositeLetterUpperCase(lastName),
      date,
      data,
    );

    if (!record) throw customError.create();

    const reponseData = { ...record, day: dateUtil.utcToDay(record.date) };
    delete reponseData.date;

    const response = responseSuccess.created(reponseData);
    res.status(response.status).json(response.body);
  }
}

module.exports = new Bdays();
