const customError = require('../util/customError');
const responseError = require('../util/responseError');

const errorMessages = {
  [JSON.parse(customError.create().message).type]: responseError.create,
  [JSON.parse(customError.query().message).type]: responseError.query,
  [JSON.parse(customError.delete().message).type]: responseError.delete,
  [JSON.parse(customError.update().message).type]: responseError.update,
  [JSON.parse(customError.timeout().message).type]: responseError.timeout,
  [JSON.parse(customError.notMofify().message).type]: responseError.notModify,
  [JSON.parse(customError.notFound().message).type]: responseError.notFound,
};

function printUndefined(res, err) {
  const undefinedError = responseError.undefinedError({ err: String(err) });
  res.status(undefinedError.status).json(undefinedError.body);
}

// eslint-disable-next-line
async function checkError(err, res) {
  if (err.name === 'CustomError') {
    const errMessage = JSON.parse(err.message);

    if (errMessage && errMessage.type && errorMessages[errMessage.type]) {
      const response = errorMessages[errMessage.type](errMessage.data);
      res.status(response.status).json(response.body);
      return;
    }
    printUndefined(res, err);
    return;
  }
  printUndefined(res, err);
}

function wrapAsyncError(fn) {
  return (req, res, next) => {
    fn(req, res, next).catch((e) => checkError(e, res));
  };
}

module.exports = wrapAsyncError;
