const statusCodes = require('./statusCodes');

class ResponseSuccess {
  created(arg = {}) {
    return {
      status: statusCodes.CREATED,
      body: {
        data: arg,
      },
    };
  }

  query(arg = {}) {
    return {
      status: statusCodes.SUCCESS,
      body: {
        data: arg,
      },
    };
  }

  delete(arg = {}) {
    return {
      status: statusCodes.SUCCESS,
      body: {
        data: arg,
      },
    };
  }

  update(arg = {}) {
    return {
      status: statusCodes.SUCCESS,
      body: {
        data: arg,
      },
    };
  }
}

module.exports = new ResponseSuccess();
