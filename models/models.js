const fs = require('fs/promises');

exports.selectApi = async () => {
  const endpoints = await fs.readFile(`db/endpoints.json`, 'utf8');
  return endpoints;
};
