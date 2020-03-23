const responseError = require('../util/responseError');
const responseSuccess = require('../util/responseSuccess');
const TemplatesService = require('../services/templates');

class Templates {
  async create(req, res) {
    try {
      const { title, text, blocks, attachments } = req.body;
      const row = await TemplatesService.create(title, text, blocks, attachments || []);

      const response = responseSuccess.created(row);

      res.status(response.status).json(response.body);
    } catch (e) {
      const response = responseError.create();
      res.status(response.status).json(response.body);
    }
  }

  async updateRecord(req, res) {
    try {
      const { templateId } = req.params;
      const { title, text, blocks, attachments } = req.body;
      const row = await TemplatesService.updateRecord(templateId, title, text, blocks, attachments || []);

      const response = responseSuccess.updateRecord(row);

      res.status(response.status).json(response.body);
    } catch (e) {
      const response = responseError.updateRecord();
      res.status(response.status).json(response.body);
    }
  }

  async deleteRecord(req, res) {
    try {
      const { templateId } = req.params;
      const data = await TemplatesService.deleteRecord(templateId);

      const response = responseSuccess.deleteRecord(data);

      res.status(response.status).json(response.body);
    } catch (e) {
      const response = responseError.deleteRecord();
      res.status(response.status).json(response.body);
    }
  }

  async getMatched(req, res) {
    try {
      const { templateId, bdayId } = req.params;

      const template = await TemplatesService.getMatched(templateId, bdayId);

      if (template === 'timeout') {
        const response = responseError.timeout();
        res.status(response.status).json(response.body);
        return;
      } else if (template === 'query') {
        throw template;
      }
      const response = responseSuccess.query(template);

      res.status(response.status).json(response.body);
    } catch (e) {
      const response = responseError.query();
      res.status(response.status).json(response.body);
    }
  }

  async get(req, res) {
    try {
      const { templateId } = req.params;
      const row = await TemplatesService.getById(+templateId, {
        attributes: ['title', 'text', 'blocks', 'attachments'],
      });

      const response = responseSuccess.query(row);

      res.status(response.status).json(response.body);
    } catch (e) {
      const response = responseError.query();
      res.status(response.status).json(response.body);
    }
  }

  async getAll(req, res) {
    try {
      const row = await TemplatesService.getAll({
        attributes: ['id', 'title'],
      });

      const response = responseSuccess.query(row);

      res.status(response.status).json(response.body);
    } catch (e) {
      const response = responseError.query();
      res.status(response.status).json(response.body);
    }
  }
}

module.exports = new Templates();
