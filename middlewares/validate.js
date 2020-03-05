function query(schema) {
  return function validateQuery(req, res, next) {
    const { error } = schema.validate(req.query);

    next(error);
  };
}

function body(schema) {
  return function validateBody(req, res, next) {
    const { error } = schema.validate(req.body);

    next(error);
  };
}

function params(schema) {
  return function validateParams(req, res, next) {
    const { error } = schema.validate(req.params);

    next(error);
  };
}

module.exports = {
  query,
  body,
  params,

};
