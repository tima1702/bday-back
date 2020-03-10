const statusCodes = require('./statusCodes');

/**
 *
 *
 * @param {Object} data
 * @returns
 */
function buildbody(data = {}) {
  const body = {
    data,
  };

  return body;
}

/**
 * Success created
 *
 * @param {Object} data
 * @returns
 */
function created(data) {
  return { status: statusCodes.CREATED, body: buildbody(data) };
}

/**
 * Success query
 *
 * @param {Object} data
 * @returns
 */
function query(data) {
  return { status: statusCodes.SUCCESS, body: buildbody(data) };
}

/**
 * Success delete
 *
 * @param {Object} data
 * @returns
 */
function deleteRecord(data) {
  return { status: statusCodes.SUCCESS, body: buildbody(data) };
}

/**
 * Success update
 *
 * @param {Object} data
 * @returns
 */
function updateRecord(data) {
  return { status: statusCodes.SUCCESS, body: buildbody(data) };
}

module.exports = { created, query, deleteRecord, updateRecord };
