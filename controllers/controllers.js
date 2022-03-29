const { articleData } = require('../db/data/test-data');
const topics = require('../db/data/test-data/topics');
const { selectTopics, selectArticleById } = require('../models/models');




exports.getTopics = (req, res, next) => {
  selectTopics().then((topics) => {
    res.status(200).send(topics)
  });
};

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  selectArticleById(article_id).then((article) => {
      res.status(200).send(article);
  });
};
