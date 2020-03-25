const responseSuccess = require('../util/responseSuccess');
const TemplatesService = require('../services/templates');
const customError = require('../util/customError');

class Templates {
  async create(req, res) {
    const { title, text, blocks, attachments } = req.body;
    const record = await TemplatesService.create(title, text, blocks, attachments || []);

    if (!record) throw customError.create();

    responseSuccess.created(res, record);
  }

  async updateRecord(req, res) {
    const { templateId } = req.params;
    const { title, text, blocks, attachments } = req.body;

    responseSuccess.update(
      res,
      await TemplatesService.updateRecord(templateId, title, text, blocks, attachments || []),
    );
  }

  async deleteRecord(req, res) {
    await TemplatesService.deleteRecord(req.params.templateId);

    responseSuccess.delete(res);
  }

  async getMatched(req, res) {
    const matchedTemplate = await TemplatesService.getMatched(req.params.templateId, req.params.bdayId);

    if (!matchedTemplate) throw customError.query('error build template');

    responseSuccess.query(res, matchedTemplate);
  }

  async get(req, res) {
    responseSuccess.query(res, await TemplatesService.getByIdBasicData(req.params.templateId));
  }

  async getAll(req, res) {
    responseSuccess.query(res, await TemplatesService.getAllList());
  }
}

module.exports = new Templates();
