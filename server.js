const express = require('express');
const app = express();

require('dotenv');

const port = process.env.PORT || 3001;

app.use(require('./routes'));

app.listen(port, function () {
  console.log(`App listen on ${port}!`)
});
