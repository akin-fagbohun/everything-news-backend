const { selectApi } = require('../models/models');

exports.getBase = (_, res, next) => {
  try {
    res.status(200).json({ ok: true });
  } catch (error) {
    next(error);
  }
};

exports.getApi = (req, res, next) => {
  selectApi()
    .then((api) => {
      res.header('Content-Type', 'application/json');
      res.status(200);
      res.send(JSON.stringify(api, null, 4));
    })
    .catch(next);
};
