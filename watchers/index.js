const sql = require('../sql');

function checkBday() {
  sql.procedure.checkBdays();
  setInterval(() => {
    sql.procedure.checkBdays();
  }, 1000 * 60 * 15 /* 15 MINUTES */);
}

function startAll() {
  new Promise(() => {
    checkBday();
  });
}

module.exports = { startAll };
