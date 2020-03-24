const models = require('../models');
const BdaysService = require('./bdays');
const deepFind = require('../util/deepFind');
const date = require('../util/date');
const customError = require('../util/customError');

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
  if (date.getTime() - timeStart >= timeout) throw customError.timeout();

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
    throw customError.create();
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

    if (!record) throw customError.notFound();

    return {
      id: updatedRecord.dataValues.id,
      title: updatedRecord.dataValues.title,
      text: updatedRecord.dataValues.text,
      blocks: updatedRecord.dataValues.blocks,
      attachments: updatedRecord.dataValues.attachments,
    };
  } catch (e) {
    throw customError.update();
  }
}

async function getById(id, args = {}) {
  try {
    return await TemplateModel.findOne({ where: { id }.id, ...args });
  } catch (e) {
    throw customError.query();
  }
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
  try {
    return await TemplateModel.findAll({ ...args });
  } catch (e) {
    throw customError.query();
  }
}

async function getAllList() {
  return getById({
    attributes: ['id', 'title'],
  });
}

async function deleteRecord(recordId) {
  try {
    const result = await TemplateModel.destroy({ where: { id: recordId } });
    if (!result) throw customError.notMofify();
  } catch (e) {
    throw customError.delete();
  }
}

async function getMatched(templateId, bdayId) {
  const templateRecord = await getByIdForMatchedTemplate(templateId);
  if (!templateRecord) throw customError.query('not found template');

  const bdayRecord = await BdaysService.getByIdForMatchedTemplate(bdayId);
  if (!bdayRecord) throw customError.query('not found bday');

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
