const responseError = require('../util/responseError');
const responseSuccess = require('../util/responseSuccess');
const dateUtil = require('../util/date');
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

  async create(req, res) {
    const { firstName, lastName, date, data } = req.body;

    try {
      const row = await BdaysService.create(firstName, lastName, date, data);
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
