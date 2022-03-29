const topics = require('../db/data/test-data/topics');
const { selectTopics } = require('../models/models');




exports.getTopics = (req, res, next) => {
  selectTopics().then((topics) => {
    res.status(200).send(topics)
  });
};
