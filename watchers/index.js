const sql = require('../sql');
const axios = require('axios');
const { BdaySchedule, Bday } = require('../models');

function checkTimeAndSendGreeting() {
  const run = () => {
    const utcHours = new Date().getHours() + new Date().getTimezoneOffset() / 60;
    if ((utcHours < 0 ? 24 + utcHours : utcHours) >= 10) {
      BdaySchedule.findAll({ where: { isCongratulate: false } }).then((records) => {
        records.forEach((record) => {
          Bday.findOne({ where: { id: record.dataValues.bdayId } }).then((bday) => {
            console.table(bday.dataValues);

            if (bday.data && bday.data.templateId) {
              axios
                .post('https://bday.shibanet0.tech/system/message', {
                  channel: 'UU534SR1Q',
                  text: 'string',
                  blocks: [],
                })
                .then(() => {
                  record.update({
                    isCongratulate: true,
                  });
                });
            }
          });
        });
      });
    }
  };
  run();

  setInterval(run, 60 * 1000); /* 1 MINUTE */
}

function checkBday() {
  sql.procedure.checkBdays();
  setInterval(() => {
    sql.procedure.checkBdays();
  }, 1000 * 60 * 15 /* 15 MINUTES */);
}

function startAll() {
  new Promise(() => {
    checkBday();
    checkTimeAndSendGreeting();
  });
}

module.exports = { startAll };
