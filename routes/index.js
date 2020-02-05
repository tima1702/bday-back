const router = require('express').Router();
const HelloWorld = require('../controllers/HelloWorld');

router.get('/', HelloWorld.getHello);

module.exports = router;
