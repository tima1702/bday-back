const router = require('express').Router();
const Joi = require('@hapi/joi');
const validate = require('../middlewares/validate');
const BdayController = require('../controllers/bdays');
const wrapAsyncError = require('../middlewares/wrapAsyncError');

const body = Joi.object({
  firstName: Joi.string()
    .pattern(new RegExp('^[a-zA-Zа-яА-Я-]{2,30}$'))
    .rule({ message: '"{{#label}}" must be a valid firstName ^[a-zA-Zа-яА-Я-]$ len 2-30' })
    .required(),
  lastName: Joi.string()
    .pattern(new RegExp('^[a-zA-Zа-яА-Я-]{2,30}$'))
    .rule({ message: '"{{#label}}" must be a valid lastName ^[a-zA-Zа-яА-Я-]$ len 2-30' })
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

router.get('/', wrapAsyncError(BdayController.getAll));
router.get('/:id', validate.params(id), wrapAsyncError(BdayController.getById));
router.post('/', validate.body(body), wrapAsyncError(BdayController.create));
router.delete('/:id', validate.params(id), wrapAsyncError(BdayController.deleteRecord));
router.put('/:id', validate.params(id), validate.body(body), wrapAsyncError(BdayController.updateRecord));

module.exports = router;
