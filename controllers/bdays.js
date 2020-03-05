const statusCodes = require('../util/statusCodes');
const BdaysModule = require('../services/bdays');

class Bdays {
  async getAll(req, res) {
    const data = await BdaysModule.getAll();
    res.status(statusCodes.SUCCESS).send({ data });
  }

  async create(req, res) {
    const {
      firstName, lastName, date, data,
    } = req.body;

    const row = await BdaysModule.create({
      firstName,
      lastName,
      date,
      data,
    });

    res.status(statusCodes.CREATED).json({ data: row });
  }
}

module.exports = new Bdays();
