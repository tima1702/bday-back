const models = require('../models');
const BdaysService = require('./bdays');
const deepFind = require('../util/deepFind');

const TemplateModel = models.Template;

const regexTemplateVariable = /(<!![\\._a-zA-Z]+!!>)/gm;

function changeTemplateVariable(text, userData) {
  let copy = text;
  if (copy) {
    const findItems = copy.match(regexTemplateVariable);

    if (findItems && findItems.length) {
      findItems.forEach((item) => {
        const path = item.replace('<!!', '', -1).replace('!!>', '', -1);
        copy = copy.replace(item, deepFind(userData, path) || '', -1).trim();
      });
    }
  }
  return copy;
}

function templateBlock(block, userData, timeStart, timeout) {
  const newBlock = {};

  Object.keys(block).some((item) => {
    if (typeof block[item] === 'object') {
      if (block[item].length) {
        block[item].some((itemBlock) => {
          const preparedBlock = templateBlock(itemBlock, userData, timeStart, timeout);

          if (!newBlock[item]) newBlock[item] = [];

          newBlock[item].push(preparedBlock.newBlock);

          return preparedBlock.err;
        });
      } else {
        const preparedBlock = templateBlock(block[item], userData, timeStart, timeout);
        newBlock[item] = preparedBlock.newBlock;
        return preparedBlock.err;
      }

      return false;
    }

    if (item === 'text' && typeof block[item] === 'string') {
      newBlock[item] = changeTemplateVariable(block[item], userData);
      return false;
    }

    newBlock[item] = block[item];
    return false;
  });

  return {
    newBlock,
    err: new Date().getTime() - timeStart >= timeout ? new Error('timeout error') : null,
  };
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

function getMatched(templateId, bdayId) {
  return new Promise((resolve, reject) => {
    Promise.all([
      BdaysService.getById(+bdayId, { attributes: ['firstName', 'lastName', 'data', 'date'] }),
      getById(+templateId, {
        attributes: ['title', 'text', 'blocks', 'attachments'],
      }),
    ])
      .then(([user, template]) => {
        if (!user || !template) reject('query');

        const newTemplate = { ...template.dataValues };

        const copyTemplateBlocks = [...template.blocks];

        newTemplate.blocks = [];
        let err = null;
        copyTemplateBlocks.some((block) => {
          const preparedBlock = templateBlock(block, user, new Date().getTime(), 3000);
          newTemplate.blocks.push(preparedBlock.newBlock);

          if (preparedBlock.err) {
            err = preparedBlock.err;
          }
        });
        if (err) reject('timeout');
        resolve(newTemplate);
      })
      .catch((e) => reject(e));
  });
}

module.exports = {
  getMatched,
  create,
  getById,
  updateRecord,
  getAll,
  deleteRecord,
};
