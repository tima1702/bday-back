const responseSuccess = require('../util/responseSuccess');
const dateUtil = require('../util/date');
const text = require('../util/text');
const BdaysService = require('../services/bdays');
const customError = require('../util/customError');

class Bdays {
  async getAll(req, res) {
    responseSuccess.query(res, await BdaysService.getAll());
  }

  async getById(req, res) {
    const record = await BdaysService.getByIdBasicData(req.params.id);

    if (!record) throw customError.query('not found');

    responseSuccess.query(res, {
      ...record.dataValues,
      date: dateUtil.getDateStringDefaultFormat(record.dataValues.date),
    });
  }

  async deleteRecord(req, res) {
    await BdaysService.deleteRecord(req.params.id);

    responseSuccess.delete(res);
  }

  async updateRecord(req, res) {
    const { id } = req.params;
    const { firstName, lastName, date, data } = req.body;

    responseSuccess.update(
      res,
      await BdaysService.updateRecord(
        id,
        text.compositeLetterUpperCase(firstName),
        text.compositeLetterUpperCase(lastName),
        date,
        data,
      ),
    );
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

    responseSuccess.created(res, reponseData);
  }
}

module.exports = new Bdays();
