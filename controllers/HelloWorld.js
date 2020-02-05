const FakeModel = require('../FakeModel');
const statusCodes = require('../util/statusCodes');

class HelloWorld {
  async getHello(req, res) {
    const message = await FakeModel.getHello();
    res.status(statusCodes.SUCCESS).json({ data: { message } });
  }
}

module.exports = new HelloWorld();
