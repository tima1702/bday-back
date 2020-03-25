const statusCodes = require('./statusCodes');

function sendResponse(res, status, body = {}) {
  res.status(status).json({ data: body });
}

class ResponseSuccess {
  created(res, data = {}) {
    sendResponse(res, statusCodes.CREATED, data);
  }

  query(res, data = {}) {
    sendResponse(res, statusCodes.SUCCESS, data);
  }

  delete(res, data = {}) {
    sendResponse(res, statusCodes.SUCCESS, data);
  }

  update(res, data = {}) {
    sendResponse(res, statusCodes.SUCCESS, data);
  }
}

module.exports = new ResponseSuccess();
