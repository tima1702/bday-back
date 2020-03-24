const moment = require('moment');

const DEFAULT_FORMAT = 'DD/MM/YYYY';

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

function dateToUTC(date) {
  return moment(date).utc();
}

function getDateStringDefaultFormat(date) {
  return (date && moment(date).format(DEFAULT_FORMAT)) || null;
}

module.exports = {
  getMonthName,
  utcToDay,
  getTime,
  getDateStringDefaultFormat,
  dateToUTC,
};
