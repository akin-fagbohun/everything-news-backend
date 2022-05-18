const {
  selectArticles,
  selectArticleById,
  selectArticleCommentsById,
  updateArticleById,
} = require('../models/articles-model');

exports.getArticles = (req, res, next) => {
  selectArticles(req)
    .then((articles) => {
      console.log(articles, '<<< article response in controller');
      res.status(200).send({ articles: articles });
    })
    .catch(next);
};

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  selectArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article: article[0] });
    })
    .catch(next);
};

exports.getArticleCommentsById = (req, res, next) => {
  const { article_id } = req.params;
  selectArticleCommentsById(article_id)
    .then((comments) => {
      res.status(200).send({ comments: comments });
    })
    .catch(next);
};

exports.patchArticleById = (req, res, next) => {
  const { inc_votes: votes } = req.body;
  const { article_id } = req.params;
  updateArticleById(article_id, votes)
    .then((article) => {
      res.status(201).send(article.rows[0]);
    })
    .catch(next);
};
