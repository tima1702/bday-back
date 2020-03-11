const statusCodes = require('./statusCodes');

const errorList = {
  bodyValidation: {
    status: statusCodes.BAD_REQUEST,
    code: 1,
    message: 'Body validation error',
  },
  queryValidation: {
    status: statusCodes.BAD_REQUEST,
    code: 2,
    message: 'Query validation error',
  },
  paramsValidation: {
    status: statusCodes.BAD_REQUEST,
    code: 3,
    message: 'Params validation error',
  },
  save: {
    status: statusCodes.SERVER_ERROR,
    code: 4,
    message: 'Error save',
  },
  create: {
    status: statusCodes.SERVER_ERROR,
    code: 5,
    message: 'Error create',
  },
  query: {
    status: statusCodes.SERVER_ERROR,
    code: 6,
    message: 'Error query',
  },
  deleteRecord: {
    status: statusCodes.SERVER_ERROR,
    code: 7,
    message: 'Error delete',
  },
  updateRecord: {
    status: statusCodes.SERVER_ERROR,
    code: 8,
    message: 'Error update',
  },
};

/**
 *
 *
 * @param {Number} code
 * @param {String} message
 * @param {Object} data
 * @returns
 */
function buildbody({ code, message }, data = {}) {
  const body = {
    code,
    message,
  };

  if (data) body.data = data;

  return body;
}

/**
 * Body validation error
 *
 * @param {Object} [data={}]
 * @returns
 */
function bodyValidation(data = {}) {
  const error = errorList.bodyValidation;
  return {
    status: error.status,
    body: {
      err: buildbody(error, data),
    },
  };
}

/**
 * Query validation error
 *
 * @param {Object} [data={}]
 * @returns
 */
function queryValidation(data = {}) {
  const error = errorList.queryValidation;
  return {
    status: error.status,
    body: {
      err: buildbody(error, data),
    },
  };
}

/**
 * Params validation error
 *
 * @param {Object} [data={}]
 * @returns
 */
function paramsValidation(data = {}) {
  const error = errorList.paramsValidation;
  return {
    status: error.status,
    body: {
      err: buildbody(error, data),
    },
  };
}

/**
 * Error save
 *
 * @param {Object} [data={}]
 * @returns
 */
function save(data = {}) {
  const error = errorList.save;
  return {
    status: error.status,
    body: {
      err: buildbody(error, data),
    },
  };
}

/**
 * Error create
 *
 * @param {Object} [data={}]
 * @returns
 */
function create(data = {}) {
  const error = errorList.create;
  return {
    status: error.status,
    body: {
      err: buildbody(error, data),
    },
  };
}

/**
 * Error query
 *
 * @param {Object} [data={}]
 * @returns
 */
function query(data = {}) {
  const error = errorList.query;
  return {
    status: error.status,
    body: {
      err: buildbody(error, data),
    },
  };
}

/**
 * Error delete
 *
 * @param {Object} [data={}]
 * @returns
 */
function deleteRecord(data = {}) {
  const error = errorList.deleteRecord;
  return {
    status: error.status,
    body: {
      err: buildbody(error, data),
    },
  };
}

/**
 * Error update
 *
 * @param {Object} [data={}]
 * @returns
 */
function updateRecord(data = {}) {
  const error = errorList.updateRecord;
  return {
    status: error.status,
    body: {
      err: buildbody(error, data),
    },
  };
}

module.exports = { bodyValidation, queryValidation, paramsValidation, save, create, query, deleteRecord, updateRecord };