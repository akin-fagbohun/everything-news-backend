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
      res.status(200).send(api);
    })
    .catch(next);
};
