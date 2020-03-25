const express = require('express');
const { sequelize } = require('./models');
const { checkMigrations } = require('./services/migrations');
const watchers = require('./watchers');
const sql = require('./sql');

sequelize
  .authenticate()
  .then(() => {
    console.log('..........SUCCESS_CONNECTION');

    Promise.all([checkMigrations(), sql.procedure.createAllIfNotExists()]).then(([message]) => {
      console.log(message);

      const app = express();

      app.use(express.json());

      app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();

        app.options('*', (req, res) => {
          res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
          res.send();
        });
      });

      watchers.startAll();

      require('dotenv');

      const port = process.env.PORT || 3001;

      app.use(require('./routes'));

      app.listen(port, () => {
        console.log(`App listen on ${port}!`);
      });

    }).catch(e => {
      console.error(e);
      console.log('Fix the errors and restart the app');
      setTimeout(() => console.log(), 60 * 5 * 1000); /* 5 minutes */
    });
  })
  .catch((error) => {
    console.log('Error connecting to the database: ', error);
  });


