const statusCodes = require('../util/statusCodes');
const responseError = require('../util/responseError');
const responseSuccess = require('../util/responseSuccess');
const dateUtil = require('../util/date');
const BdaysService = require('../services/bdays');

class Bdays {
  async getAll(req, res) {
    const data = await BdaysService.getAll();
    res.status(statusCodes.SUCCESS).send({ data });
  }

  async create(req, res) {
    const { firstName, lastName, date, data } = req.body;

    try {
      const row = await BdaysService.create(firstName, lastName, date, data);

      const response = responseSuccess.created({ ...row, date: dateUtil.utcToDay(row.date) });

      res.status(response.status).json(response.body);
    } catch (e) {
      const response = responseError.create();
      res.status(response.status).json(response.body);
    }
  }
}

module.exports = new Bdays();
