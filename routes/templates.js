const router = require('express').Router();
const Joi = require('@hapi/joi');
const validate = require('../middlewares/validate');
const TemplateController = require('../controllers/templates');

const body = Joi.object({
  title: Joi.string().required(),
  text: Joi.string().required(),
  blocks: Joi.array().required(),
  attachments: Joi.array(),
});

const getParamsMatched = Joi.object({
  templateId: Joi.number()
    .integer()
    .rule({ message: '"{{#label}}" must be a valid templateId' })
    .required(),

  bdayId: Joi.number()
    .integer()
    .rule({ message: '"{{#label}}" must be a valid bdayId' })
    .required(),
});

const getParams = Joi.object({
  templateId: Joi.number()
    .integer()
    .rule({ message: '"{{#label}}" must be a valid templateId' })
    .required(),
});

router.post('/', validate.body(body), TemplateController.create);

router.get('/', TemplateController.getAll);

router.get('/:templateId/:bdayId', validate.params(getParamsMatched), TemplateController.getMatched);

router.delete('/:templateId', validate.params(getParams), TemplateController.deleteRecord);

router.put('/:templateId', validate.params(getParams), validate.body(body), TemplateController.updateRecord);

router.get('/:templateId', validate.params(getParams), TemplateController.get);

module.exports = router;
