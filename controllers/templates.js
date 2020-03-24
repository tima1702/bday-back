const responseSuccess = require('../util/responseSuccess');
const TemplatesService = require('../services/templates');

class Templates {
  async create(req, res) {
    const { title, text, blocks, attachments } = req.body;
    const row = await TemplatesService.create(title, text, blocks, attachments || []);

    const response = responseSuccess.created(row);
    res.status(response.status).json(response.body);
  }

  async updateRecord(req, res) {
    const { templateId } = req.params;
    const { title, text, blocks, attachments } = req.body;
    const row = await TemplatesService.updateRecord(templateId, title, text, blocks, attachments || []);

    const response = responseSuccess.updateRecord(row);
    res.status(response.status).json(response.body);
  }

  async deleteRecord(req, res) {
    const data = await TemplatesService.deleteRecord(req.params.templateId);

    const response = responseSuccess.deleteRecord(data);
    res.status(response.status).json(response.body);
  }

  async getMatched(req, res) {
    const template = await TemplatesService.getMatched(req.params.templateId, req.params.bdayId);

    const response = responseSuccess.query(template);
    res.status(response.status).json(response.body);
  }

  async get(req, res) {
    const row = await TemplatesService.getByIdBasicData(req.params.templateId);

    const response = responseSuccess.query(row);
    res.status(response.status).json(response.body);
  }

  async getAll(req, res) {
    const row = await TemplatesService.getAllList();

    const response = responseSuccess.query(row);
    res.status(response.status).json(response.body);
  }
}

module.exports = new Templates();
