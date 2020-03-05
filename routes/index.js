const router = require('express').Router();
const bdays = require('./bdays');

router.use('/bdays', bdays);

module.exports = router;
