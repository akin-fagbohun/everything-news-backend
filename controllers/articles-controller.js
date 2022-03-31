const { articleData } = require('../db/data/test-data');
const articles = require('../db/data/test-data/articles');
const topics = require('../db/data/test-data/topics');
const { selectArticles, selectArticleById, selectArticleCommentsById, updateArticleById } = require('../models/articles-model');


// GET request controllers

exports.getArticles = (req, res, next) => {
  selectArticles().then((articles) => {
    res.status(200).send(articles)
  })
}

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

// PATCH request controllers 

exports.patchArticleById = (req, res, next) => {
  const { inc_votes: votes } = req.body;
  const { article_id } = req.params;
  updateArticleById(article_id, votes).then((article) => {
    res.status(201).send(article.rows[0])
  });
}