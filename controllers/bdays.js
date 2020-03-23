const responseSuccess = require('../util/responseSuccess');
const dateUtil = require('../util/date');
const text = require('../util/text');
const BdaysService = require('../services/bdays');

class Bdays {
  async getAll(req, res) {
    const data = await BdaysService.getAll();

    const response = responseSuccess.query(data);
    res.status(response.status).json(response.body);
  }

  async deleteRecord(req, res) {
    const { id } = req.params;
    const data = await BdaysService.deleteRecord(id);

    const response = responseSuccess.deleteRecord(data);
    res.status(response.status).json(response.body);
  }

  async updateRecord(req, res) {
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
    res.status(response.status).json(response.body);
  }

  async create(req, res) {
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
  }
}

module.exports = new Bdays();
