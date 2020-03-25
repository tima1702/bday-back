const CustomError = require('../util/customError');
const responseError = require('../util/responseError');

const errorMessages = {
  [JSON.parse(new CustomError().create().message).type]: responseError.create,
  [JSON.parse(new CustomError().query().message).type]: responseError.query,
  [JSON.parse(new CustomError().delete().message).type]: responseError.delete,
  [JSON.parse(new CustomError().update().message).type]: responseError.update,
  [JSON.parse(new CustomError().timeout().message).type]: responseError.timeout,
  [JSON.parse(new CustomError().notModify().message).type]: responseError.notModify,
  [JSON.parse(new CustomError().notFound().message).type]: responseError.notFound,
};

function printUndefined(res, err) {
  const undefinedError = responseError.undefinedError({ err: err.toString() });
  res.status(undefinedError.status).json(undefinedError.body);
}

// eslint-disable-next-line
async function checkError(err, res) {
  if (err.name === 'CustomError') {
    try {
      const errMessage = JSON.parse(err.message);

      if (errMessage && errMessage.type && errorMessages[errMessage.type]) {
        const response = errorMessages[errMessage.type](errMessage.data);
        res.status(response.status).json(response.body);
        return;
      }
      return printUndefined(res, err);
    } catch (e) {
      return printUndefined(res, err);
    }
  }
  printUndefined(res, err);
}

const wrapAsyncError = (fn) => (req, res, next) => {
  fn(req, res, next).catch((e) => checkError(e, res));
};

module.exports = wrapAsyncError;
