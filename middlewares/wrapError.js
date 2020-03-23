const customError = require('../util/customError');
const responseError = require('../util/responseError');

const errorMessages = {
  [customError.create().message]: responseError.create(),
  [customError.query().message]: responseError.query(),
  [customError.delete().message]: responseError.deleteRecord(),
  [customError.update().message]: responseError.updateRecord(),
  [customError.timeout().message]: responseError.timeout(),
  [customError.notMofify().message]: responseError.notModify(),
  [customError.notFound().message]: responseError.notFound(),
};

const undefinedError = responseError.undefinedError();

// eslint-disable-next-line
async function checkError(err, req, res, next) {
  if (err && err.message && errorMessages[err.message]) {
    res.status(errorMessages[err.message].status).json(errorMessages[err.message].body);
    return;
  }

  res.status(undefinedError.status).json(undefinedError.body);
}

module.exports = checkError;
