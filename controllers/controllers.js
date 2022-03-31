const { articleData } = require('../db/data/test-data');
const articles = require('../db/data/test-data/articles');
const topics = require('../db/data/test-data/topics');
const { selectTopics, selectArticleById, selectUsers, selectArticles, updateArticleById } = require('../models/models');

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

exports.getUsers = (req, res, next) => {
  selectUsers().then((users) => {
    res.status(200).send(users)
  });
};

exports.getArticles = (req, res, next) => {
  selectArticles().then((articles) => {
    // console.log(articles.length);
    res.status(200).send(articles)
  })
}

exports.patchArticleById = (req, res, next) => {
  const { inc_votes: votes } = req.body;
  const { article_id } = req.params;
  updateArticleById(article_id, votes).then((article) => {
    res.status(201).send(article.rows[0])
  });
}
