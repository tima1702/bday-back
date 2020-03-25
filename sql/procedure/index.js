const { sequelize, Sequelize } = require('../../models');
const fs = require('fs');
const path = require('path');

const listProcedure = [{
  file: 'checkBdays.sql',
  name: 'checkBdays',
}];

function checkBdays() {
  return new Promise((resolve, reject) => {
    sequelize.query('CALL "checkBdays"();').then((...resp) => resolve(...resp)).catch(e => {
      console.error('Error starting the application procedure "checkBdays"', e);
      reject(e);
    });
  });
}

function createProcedure(file) {
  return sequelize.query(fs.readFileSync(path.resolve(__dirname, file)).toString());
}

function checkExistsProcedure(procedureName) {
  return new Promise((resolve, reject) => {
    sequelize.query(
        `
                SELECT EXISTS(
                               SELECT *
                               FROM pg_catalog.pg_proc
                                        JOIN pg_namespace ON pg_catalog.pg_proc.pronamespace = pg_namespace.oid
                               WHERE proname = ?
                           )
      `,
      {
        replacements: [procedureName],
        type: Sequelize.QueryTypes.SELECT,
      },
    ).then(records => {
      let isExists = false;

      records.forEach(record => {
          if (!isExists) isExists = record.exists;
        },
      );

      if (!isExists) resolve('not exists');

      resolve('exists');
    }).catch((e) => reject(`Error check: ${e}`));
  });

}

function createAllIfNotExists() {
  return new Promise((resolve, reject) => {
    Promise.all(listProcedure.map(procedure => {
      if (!procedure || !procedure.file || !procedure.name) {
        console.log('ERROR Read procedure data', procedure);
        return new Promise((resolve) => resolve());
      }

      return new Promise((resolve1, reject1) => {
        checkExistsProcedure(procedure.name).then((status) => {
          if (status === 'not exists') {
            console.log(`Start create procedure: ${procedure.file}`);
            createProcedure(procedure.file).then(resolve1).catch(reject1);
          } else {
            resolve1();
          }
        }).catch(reject1);
      });
    })).then(() => {
      console.log('All procedures are created!');
      resolve();
    }).catch((e) => {
      console.error(`Error when creating procedures!: ${e}`);
      reject(e);
    });
  });
}

module.exports = { createAllIfNotExists, checkBdays };
