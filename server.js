const express = require('express');
const app = express();
const sequelize = require('./models').sequelize;

sequelize
  .authenticate()
  .then(() => {
    console.log('..........SUCCESS_CONNECTION');
  })
  .catch(error => {
    console.log('..........', error);
  });

require('dotenv');

const port = process.env.PORT || 3001;

app.use(require('./routes'));

app.listen(port, function () {
  console.log(`App listen on ${port}!`);
});
