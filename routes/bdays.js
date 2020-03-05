const router = require('express').Router();
const Joi = require('@hapi/joi');
const validate = require('../middlewares/validate');
const BdayController = require('../controllers/bdays');

const body = Joi.object({
  firstName: Joi.string()
    .alphanum()
    .min(2)
    .max(15)
    .required(),
  lastName: Joi.string()
    .alphanum()
    .min(2)
    .max(15)
    .required(),
  data: Joi.object(),
  date: Joi.date().timestamp('unix'),
});

router.get('/', BdayController.getAll);
router.post('/', validate.body(body), BdayController.create);

module.exports = router;
