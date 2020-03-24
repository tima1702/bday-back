const responseSuccess = require('../util/responseSuccess');
const TemplatesService = require('../services/templates');
const customError = require('../util/customError');

class Templates {
  async create(req, res) {
    const { title, text, blocks, attachments } = req.body;
    const record = await TemplatesService.create(title, text, blocks, attachments || []);

    if (!record) throw customError.create();

    const response = responseSuccess.created(record);
    res.status(response.status).json(response.body);
  }

  async updateRecord(req, res) {
    const { templateId } = req.params;
    const { title, text, blocks, attachments } = req.body;
    const record = await TemplatesService.updateRecord(templateId, title, text, blocks, attachments || []);

    if (!record) throw customError.update();

    const response = responseSuccess.update(record);
    res.status(response.status).json(response.body);
  }

  async deleteRecord(req, res) {
    const countRecords = await TemplatesService.deleteRecord(req.params.templateId);

    if (!countRecords) throw customError.delete();

    const response = responseSuccess.delete();
    res.status(response.status).json(response.body);
  }

  async getMatched(req, res) {
    const matchedTemplate = await TemplatesService.getMatched(req.params.templateId, req.params.bdayId);

    if (!matchedTemplate) throw customError.query('error build template');

    const response = responseSuccess.query(matchedTemplate);
    res.status(response.status).json(response.body);
  }

  async get(req, res) {
    const record = await TemplatesService.getByIdBasicData(req.params.templateId);

    if (!record) throw customError.query('not found');

    const response = responseSuccess.query(record);
    res.status(response.status).json(response.body);
  }

  async getAll(req, res) {
    const records = await TemplatesService.getAllList();

    const response = responseSuccess.query(records);
    res.status(response.status).json(response.body);
  }
}

module.exports = new Templates();
