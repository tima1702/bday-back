const router = require('express').Router();
const Joi = require('@hapi/joi');
const validate = require('../middlewares/validate');
const BdayController = require('../controllers/bdays');
const wrapAsync = require('../util/wrapAsync');

const body = Joi.object({
  firstName: Joi.string()
    .pattern(new RegExp('^[a-zA-Zа-яА-Я]{2,15}$'))
    .rule({ message: '"{{#label}}" must be a valid firstName' })
    .required(),
  lastName: Joi.string()
    .pattern(new RegExp('^[a-zA-Zа-яА-Я]{2,15}$'))
    .rule({ message: '"{{#label}}" must be a valid lastName' })
    .required(),
  data: Joi.object(),
  date: Joi.number()
    .required()
    .strict()
    .$.integer()
    .min(0)
    .max(2147483648)
    .rule({ message: '"{{#label}}" must be a valid unix timestamp' }),
});

const id = Joi.object({
  id: Joi.number()
    .integer()
    .rule({ message: '"{{#label}}" must be a valid id' })
    .required(),
});

router.get('/', wrapAsync(BdayController.getAll));
router.post('/', validate.body(body), wrapAsync(BdayController.create));
router.delete('/:id', validate.params(id), wrapAsync(BdayController.deleteRecord));
router.put('/:id', validate.params(id), validate.body(body), wrapAsync(BdayController.updateRecord));

module.exports = router;
