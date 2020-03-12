const router = require('express').Router();
const bdays = require('./bdays');
const templates = require('./templates');

router.use('/bdays', bdays);
router.use('/templates', templates);

module.exports = router;
