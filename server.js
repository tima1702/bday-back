const express = require('express');
const { sequelize } = require('./models');

const app = express();

sequelize
  .authenticate()
  .then(() => {
    console.log('..........SUCCESS_CONNECTION');
  })
  .catch((error) => {
    console.log('..........', error);
  });

require('dotenv');

const port = process.env.PORT || 3001;

app.use(require('./routes'));

app.listen(port, () => {
  console.log(`App listen on ${port}!`);
});
