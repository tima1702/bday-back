const express = require('express');
const { sequelize } = require('./models');
const watchers = require('./watchers');
const sql = require('./sql');

const app = express();

app.use(express.json());

sequelize
  .authenticate()
  .then(() => {
    console.log('..........SUCCESS_CONNECTION');
  })
  .catch((error) => {
    console.log('..........', error);
  });

watchers.startAll();
sql.procedure.createAllIfNotExists();

require('dotenv');

const port = process.env.PORT || 3001;

app.use(require('./routes'));

app.listen(port, () => {
  console.log(`App listen on ${port}!`);
});
