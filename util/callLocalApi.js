const axios = require('axios');
require('dotenv');

const port = process.env.PORT || 3001;
const url = `http://localhost:${port}`;

class CallLocalApi {
  async post(path = '', data = {}) {
    return axios.post(`${url}${path}`, data);
  }

  async put(path = '', data = {}) {
    return axios.put(`${url}${path}`, data);
  }

  async delete(path = '', data = {}) {
    return axios.delete(`${url}${path}`, data);
  }

  async get(path = '') {
    return axios.get(`${url}${path}`);
  }
}

module.exports = new CallLocalApi();
