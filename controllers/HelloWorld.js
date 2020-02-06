const { Bday } = require('../models');
const statusCodes = require('../util/statusCodes');

class HelloWorld {
  async getHello(req, res) {
    const data = await Bday.findAndCountAll();
    res.status(statusCodes.SUCCESS).json({ data });
  }
}

module.exports = new HelloWorld();
