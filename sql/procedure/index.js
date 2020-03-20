const { sequelize,Sequelize } = require('../../models');
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
  sequelize.query(fs.readFileSync(path.resolve(__dirname, file)).toString()).then(() => console.log(`Success created procedure ${file}!`))
    .catch((e) => console.error(`Error created procedure ${file}!`, e));
}

function createAllIfNotExists() {
  new Promise(() => {
    listProcedure.forEach(procedure => {
      if (!procedure || !procedure.file || !procedure.name) {
        console.log('ERROR Read procedure data', procedure);
        return;
      }

      sequelize.query(
          `
        SELECT 
          EXISTS (
            SELECT 
              * 
            FROM 
              pg_catalog.pg_proc 
              JOIN pg_namespace ON pg_catalog.pg_proc.pronamespace = pg_namespace.oid 
            WHERE 
              proname = ?
          )
      `,
        {
          replacements: [procedure.name],
          type: Sequelize.QueryTypes.SELECT,
        },
      ).then(records => {
        let isExists = true;

        records.forEach(record => {
            if (!record.exists) isExists = false;
          },
        );

        if (!isExists) {
          console.log(`Start create procedure ${procedure.file}...`);
          createProcedure(procedure.file);
        }
      }).catch((e) => console.error(`Error check exists procedure ${procedure.name}:`, e));
    });
  });
}

module.exports = { createAllIfNotExists, checkBdays };
