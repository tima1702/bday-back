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

async function updateRecord(recordId, title, text, blocks, attachments = []) {
  try {
    const record = await TemplateModel.findOne({ where: { id: recordId } });

    const updatedRecord = await record.update({
      title,
      text,
      blocks,
      attachments: attachments && attachments.length ? attachments : record.attachments,
    });

    if (!record) throw new Error('record not found');

    return {
      id: updatedRecord.dataValues.id,
      title: updatedRecord.dataValues.title,
      text: updatedRecord.dataValues.text,
      blocks: updatedRecord.dataValues.blocks,
      attachments: updatedRecord.dataValues.attachments,
    };
  } catch (e) {
    throw new Error('error update');
  }
}

async function getById(id, args = {}) {
  try {
    return await TemplateModel.findOne({ where: { id }.id, ...args });
  } catch (e) {
    throw new Error('error query by id');
  }
}

async function getAll(args = {}) {
  try {
    return await TemplateModel.findAll({ ...args });
  } catch (e) {
    throw new Error('error query');
  }
}

async function deleteRecord(recordId) {
  try {
    const result = await TemplateModel.destroy({ where: { id: recordId } });
    if (result === 0) throw new Error('not modify');
  } catch (e) {
    throw new Error('error delete');
  }
}

module.exports = {
  create,
  getById,
  updateRecord,
  getAll,
  deleteRecord,
};
