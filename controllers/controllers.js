const { articleData } = require('../db/data/test-data');
const topics = require('../db/data/test-data/topics');
const { selectTopics, selectArticleById, selectArticleCommentsById, selectUsers, updateArticleById } = require('../models/models');

exports.getTopics = (req, res, next) => {
  selectTopics().then((topics) => {
    res.status(200).send(topics)
  });
};

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  selectArticleById(article_id).then((article) => {
      res.status(200).send(article.rows[0]);
  });
};

exports.getArticleCommentsById = (req, res, next) => {
  const { article_id } = req.params;
  selectArticleCommentsById(article_id).then((article) => {
    console.log(article.rows);
      res.status(200).send(article.rows);
  });
};

exports.getUsers = (req, res, next) => {
  selectUsers().then((topics) => {
    res.status(200).send(topics)
  });
};

exports.patchArticleById = (req, res, next) => {
  const { inc_votes: votes } = req.body;
  const { article_id } = req.params;
  updateArticleById(article_id, votes).then((article) => {
    res.status(201).send(article.rows[0])
  });
}
