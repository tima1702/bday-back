const axios = require('axios');
const sql = require('../sql');
const { BdaySchedule, Bday } = require('../models');
const TemplatesService = require('../services/templates');

function checkTimeAndSendGreeting() {
  const run = () => {
    const utcHours = new Date().getHours() + new Date().getTimezoneOffset() / 60;
    if ((utcHours < 0 ? 24 + utcHours : utcHours) >= 10) {
      BdaySchedule.findAll({ where: { isCongratulate: false } }).then((records) => {
        records.forEach((record) => {
          Bday.findOne({ where: { id: record.dataValues.bdayId } }).then((bday) => {
            if (bday.data && bday.data.templateId && bday.data.targetChannelId) {
              TemplatesService.getMatched(bday.data.templateId, record.dataValues.bdayId).then(({ text, blocks }) => {
                if (text && blocks) {
                  axios
                    .post('https://bday.shibanet0.tech/system/message', {
                      channel: bday.data.targetChannelId,
                      text,
                      blocks,
                    })
                    .then(() => {
                      record.update({
                        isCongratulate: true,
                      });
                    })
                    .catch(() => console.error('ERROR Send message in slack bot!'));
                }
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
  // eslint-disable-next-line no-new
  new Promise(() => {
    checkBday();
    checkTimeAndSendGreeting();
  });
}

module.exports = { startAll };
