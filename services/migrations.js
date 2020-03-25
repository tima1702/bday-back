const { sequelize, Sequelize } = require('../models');
const fs = require('fs');

function getLastMigration(arr = []) {
  let lastMigration = {};

  arr.forEach((fileName) => {
    const [time] = fileName.split('-') || [];
    if (time && +time) {
      if (!lastMigration.time)
        lastMigration = {
          time: +time,
          fileName,
        };
      if (+time > lastMigration.time)
        lastMigration = {
          time: +time,
          fileName,
        };
    }
  });

  return lastMigration;
}

function getLastMigrationInProd() {
  return new Promise((resolve, reject) => {
    sequelize
      .query(`SELECT name FROM "SequelizeMeta";`, {
        type: Sequelize.QueryTypes.SELECT,
      })
      .then((records) => {
        resolve(getLastMigration(records.map((file) => file.name)));
      })
      .catch((e) => reject(e));
  });
}

function getLastMigrationLocal() {
  return new Promise((resolve, reject) => {
    fs.readdir(`${__dirname}/../migrations`, (err, files) => {
      if (err) reject(err);
      resolve(getLastMigration(files));
    });
  });
}

function checkMigrations() {
  return new Promise((resolve, reject) => {
    Promise.all([getLastMigrationLocal(), getLastMigrationInProd()])
      .then(([localLast, prodLast]) => {
        if (!localLast) reject('Not found last local migration');
        if (!prodLast) reject('Not found last production migration');

        const lastMigrationsStatus = `
      Last local - ${localLast.fileName}
      Last production - ${prodLast.fileName}
      `;

        if (localLast.time > prodLast.time) reject(`Newer migrations are located "locally"!${lastMigrationsStatus}`);
        if (prodLast.time > localLast.time) reject(`Newer migrations are located "production"!${lastMigrationsStatus}`);

        resolve(`The successful check migrations!${lastMigrationsStatus}`);
      })
      .catch((e) => reject(`Error checkMigrations ${e}`));
  });
}

module.exports = { getLastMigrationInProd, getLastMigrationLocal, checkMigrations };
