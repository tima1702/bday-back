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

module.exports = { created };
