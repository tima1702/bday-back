const responseError = require('../util/responseError');
const responseSuccess = require('../util/responseSuccess');
const dateUtil = require('../util/date');
const text = require('../util/text');
const BdaysService = require('../services/bdays');

class Bdays {
  async getAll(req, res) {
    try {
      const data = await BdaysService.getAll();

      const response = responseSuccess.query(data);

      res.status(response.status).send(response.body);
    } catch (e) {
      const response = responseError.query();
      res.status(response.status).json(response.body);
    }
  }

  async deleteRecord(req, res) {
    try {
      const { id } = req.params;
      const data = await BdaysService.deleteRecord(id);

      const response = responseSuccess.deleteRecord(data);

      res.status(response.status).send(response.body);
    } catch (e) {
      const response = responseError.deleteRecord();
      res.status(response.status).json(response.body);
    }
  }

  async updateRecord(req, res) {
    try {
      const { id } = req.params;
      const { firstName, lastName, date, data } = req.body;
      const row = await BdaysService.updateRecord(
        id,
        text.firstLetterUpperCase(firstName),
        text.firstLetterUpperCase(lastName),
        date,
        data,
      );

      const response = responseSuccess.updateRecord(row);
      res.status(response.status).send(response.body);
    } catch (e) {
      const response = responseError.updateRecord();
      res.status(response.status).json(response.body);
    }
  }

  async create(req, res) {
    try {
      const { firstName, lastName, date, data } = req.body;
      const row = await BdaysService.create(
        text.firstLetterUpperCase(firstName),
        text.firstLetterUpperCase(lastName),
        date,
        data,
      );
      const reponseData = { ...row, day: dateUtil.utcToDay(row.date) };
      delete reponseData.date;

      const response = responseSuccess.created(reponseData);

      res.status(response.status).json(response.body);
    } catch (e) {
      const response = responseError.create();
      res.status(response.status).json(response.body);
    }
  }
}

module.exports = new Bdays();
