const models = require('../models');

const TemplateModel = models.Template;

async function create(title, text, blocks, attachments) {
  try {
    const result = await TemplateModel.create({
      title,
      text,
      blocks,
      attachments,
    });

    return {
      id: result.id,
      title: result.title,
      text: result.text,
      blocks: result.blocks,
      attachments: result.attachments,
    };
  } catch (e) {
    throw new Error('error create');
  }
}

async function getById(id, args = {}) {
  try {
    return await TemplateModel.findOne({ where: { id }.id, ...args });
  } catch (e) {
    throw new Error('error query by id');
  }
}

module.exports = {
  create,
  getById,
};
