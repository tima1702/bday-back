const moment = require('moment');

moment.updateLocale('en', {
  week: {
    dow: 1,
  },
});

/**
 * Return month name
 *
 * @param {Number} timestamp
 */
function getMonthName(timestamp) {
  return moment.unix(timestamp).format('MMMM');
}

function utcToDay(utc) {
  return (utc && +moment(utc).format('DD')) || null;
}

function getTime() {
  return moment().valueOf();
}

module.exports = {
  getMonthName,
  utcToDay,
  getTime,
};
