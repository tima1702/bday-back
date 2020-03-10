const responseError = require('../util/responseError');

function query(schema) {
  return function validateQuery(req, res, next) {
    const { error } = schema.validate(req.query);

    if (error) {
      const response = responseError.queryValidation({ details: error.details.map((item) => item.message) });
      res.status(response.status).json(response.body);
      return;
    }

    next();
  };
}

function body(schema) {
  return function validateBody(req, res, next) {
    const { error } = schema.validate(req.body);

    if (error) {
      const response = responseError.bodyValidation({ details: error.details.map((item) => item.message) });
      res.status(response.status).json(response.body);
      return;
    }

    next();
  };
}

function params(schema) {
  return function validateParams(req, res, next) {
    const { error } = schema.validate(req.params);

    if (error) {
      const response = responseError.paramsValidation({ details: error.details.map((item) => item.message) });
      res.status(response.status).json(response.body);
      return;
    }

    next();
  };
}

module.exports = {
  query,
  body,
  params,
};
