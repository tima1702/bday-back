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
    const { templateId } = req.params;
    const data = await TemplatesService.deleteRecord(templateId);

    const response = responseSuccess.deleteRecord(data);
    res.status(response.status).json(response.body);
  }

  async getMatched(req, res) {
    const { templateId, bdayId } = req.params;
    const template = await TemplatesService.getMatched(templateId, bdayId);

    const response = responseSuccess.query(template);
    res.status(response.status).json(response.body);
  }

  async get(req, res) {
    const { templateId } = req.params;
    const row = await TemplatesService.getById(+templateId, {
      attributes: ['title', 'text', 'blocks', 'attachments'],
    });

    const response = responseSuccess.query(row);
    res.status(response.status).json(response.body);
  }

  async getAll(req, res) {
    const row = await TemplatesService.getAll({
      attributes: ['id', 'title'],
    });

    const response = responseSuccess.query(row);
    res.status(response.status).json(response.body);
  }
}

module.exports = new Templates();
