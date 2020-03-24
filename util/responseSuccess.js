const statusCodes = require('./statusCodes');

class ResponseSuccess {
  created(data = {}) {
    return {
      status: statusCodes.CREATED,
      body: {
        data,
      },
    };
  }

  query(data = {}) {
    return {
      status: statusCodes.SUCCESS,
      body: {
        data,
      },
    };
  }

  delete(data = {}) {
    return {
      status: statusCodes.SUCCESS,
      body: {
        data,
      },
    };
  }

  update(data = {}) {
    return {
      status: statusCodes.SUCCESS,
      body: {
        data,
      },
    };
  }
}

module.exports = new ResponseSuccess();
