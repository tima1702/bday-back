const express = require('express');
const { sequelize } = require('./models');
const watchers = require('./watchers');
const sql = require('./sql');

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
