const models = require('../models');
const BdaysService = require('./bdays');
const deepFind = require('../util/deepFind');
const date = require('../util/date');
const CustomError = require('../util/customError');
const asyncWrapper = require('../util/asyncWrapper');

const TemplateModel = models.Template;

const regexTemplateVariable = /(<!![\\._a-zA-Z]+!!>)/gm;

function changeTemplateVariable(text, userData) {
  let copy = text;
  if (copy) {
    const findItems = copy.match(regexTemplateVariable);

    if (findItems && findItems.length) {
      findItems.forEach((item) => {
        const path = item.replace('<!!', '', -1).replace('!!>', '', -1);
        copy = copy.replace(item, deepFind(userData || {}, path) || '', -1).trim();
      });
    }
  }
  return copy;
}

function templateBlock(block, userData, timeStart, timeout) {
  if (date.getTime() - timeStart >= timeout) throw new CustomError().timeout();

  const modifiedBlock = {};

  Object.keys(block).forEach((blockKey) => {
    const itemInBlock = block[blockKey];

    switch (typeof itemInBlock) {
      case 'string':
        if (blockKey === 'text') {
          modifiedBlock[blockKey] = changeTemplateVariable(itemInBlock, userData || {});
        } else {
          modifiedBlock[blockKey] = itemInBlock;
        }
        break;

      case 'object':
        if (Array.isArray(itemInBlock)) {
          if (!modifiedBlock[blockKey] || !Array.isArray(modifiedBlock[blockKey])) {
            modifiedBlock[blockKey] = [];
          }
          itemInBlock.forEach((nestedBlock) => {
            modifiedBlock[blockKey].push(templateBlock(nestedBlock, userData, timeStart, timeout));
          });
        } else {
          modifiedBlock[blockKey] = templateBlock(itemInBlock, userData, timeStart, timeout);
        }
        break;

      default:
        modifiedBlock[blockKey] = itemInBlock;
        break;
    }
  });

  return modifiedBlock;
}

async function create(title, text, blocks, attachments) {
  const result = await asyncWrapper(
    TemplateModel.create({
      title,
      text,
      blocks,
      attachments,
    }),
    new CustomError().create(),
  );

  return {
    id: result.id,
    title: result.title,
    text: result.text,
    blocks: result.blocks,
    attachments: result.attachments,
  };
}

async function updateRecord(recordId, title, text, blocks, attachments = []) {
  const record = await asyncWrapper(TemplateModel.findOne({ where: { id: recordId } }), new CustomError().query());

  if (!record) throw new CustomError().notFound();

  const updatedRecord = await asyncWrapper(
    record.update({
      title,
      text,
      blocks,
      attachments: attachments && attachments.length ? attachments : record.attachments,
    }),
    new CustomError().update(),
  );

  return {
    id: updatedRecord.dataValues.id,
    title: updatedRecord.dataValues.title,
    text: updatedRecord.dataValues.text,
    blocks: updatedRecord.dataValues.blocks,
    attachments: updatedRecord.dataValues.attachments,
  };
}

async function getById(id, args = {}) {
  const record = await asyncWrapper(TemplateModel.findOne({ where: { id }.id, ...args }), new CustomError().query());

  if (!record) throw new CustomError().notFound();

  return record;
}

async function getByIdForMatchedTemplate(id) {
  return getById(+id, {
    attributes: ['title', 'text', 'blocks', 'attachments'],
  });
}

async function getByIdBasicData(id) {
  return getById(+id, {
    attributes: ['title', 'text', 'blocks', 'attachments'],
  });
}

async function getAll(args = {}) {
  return await asyncWrapper(TemplateModel.findAll({ ...args }), new CustomError().query());
}

async function getAllList() {
  return getById({
    attributes: ['id', 'title'],
  });
}

async function deleteRecord(recordId) {
  const result = await asyncWrapper(TemplateModel.destroy({ where: { id: recordId } }), new CustomError().delete());
  if (!result) throw new CustomError().notModify();
  return result;
}

async function getMatched(templateId, bdayId) {
  const templateRecord = await getByIdForMatchedTemplate(templateId);
  if (!templateRecord) throw new CustomError().query('not found template');

  const bdayRecord = await BdaysService.getByIdForMatchedTemplate(bdayId);
  if (!bdayRecord) throw new CustomError().query('not found bday');

  const newTemplate = { ...templateRecord.dataValues, blocks: [] };
  templateRecord.dataValues.blocks.forEach((block) => {
    newTemplate.blocks.push(templateBlock(block, bdayRecord, new Date().getTime(), 3000));
  });
  return newTemplate;
}

module.exports = {
  getMatched,
  create,
  getById,
  updateRecord,
  getAll,
  deleteRecord,
  templateBlock,
  changeTemplateVariable,
  getByIdForMatchedTemplate,
  getByIdBasicData,
  getAllList,
};
