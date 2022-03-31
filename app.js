const express = require('express');
const { getTopics, getUsers, } = require('./controllers/controllers');
const { getArticleById, getArticleCommentsById, getArticles, patchArticleById } = require('./controllers/articles-controller');


const app = express();

// middleware
app.use(express.json());

// GET requests
app.get('/api/topics', getTopics);
app.get('/api/articles/:article_id', getArticleById);
app.get('/api/articles/:article_id/comments', getArticleCommentsById);
app.get('/api/users', getUsers);
app.get('/api/articles', getArticles)

// PATCH requests
app.patch('/api/articles/:article_id', patchArticleById);

app.use((err, req, res, next) => {
  const badRequestCodes = [];
  if (badRequestCodes.includes(err.code)) {
    res.status(400).send({ message: 'bad request.'});
  } else {
    next(err);
  };
});

// handles unexpected errors - check test log for error codes
app.use((err, req, res, next) => {
  console.log(err, '<-- error');
  res.status(500).send({ message: 'internal server error.'});
});


module.exports = app;