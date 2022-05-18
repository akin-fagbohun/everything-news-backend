const express = require('express');
const cors = require('cors');
const { getBase, getApi } = require('./controllers/controllers');
const { getTopics } = require('./controllers/topics-controller');
const { getUsers } = require('./controllers/users-controller');
const {
  postComment,
  patchCommentById,
  deleteComment,
} = require('./controllers/comments-controller');
const {
  getArticleById,
  getArticleCommentsById,
  getArticles,
  patchArticleById,
} = require('./controllers/articles-controller');

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// GET requests
app.get('/', getBase);
app.get('/api', getApi);
app.get('/api/topics', getTopics);
app.get('/api/articles', getArticles);
app.get('/api/articles/:article_id', getArticleById);
app.get('/api/articles/:article_id/comments', getArticleCommentsById);
app.get('/api/users', getUsers);

// PATCH requests
app.patch('/api/articles/:article_id', patchArticleById);
app.patch('/api/comments/:comment_id', patchCommentById);

// POST requests
app.post('/api/articles/:article_id/comments', postComment);

// DELETE requests
app.delete('/api/comments/:comment_id', deleteComment);

app.use((err, req, res, next) => {
  const badRequestCodes = ['22P02', '23503'];
  if (badRequestCodes.includes(err.code)) {
    res.status(400).send({ msg: 'Bad Request' });
  } else {
    next(err);
  }
});

// handles custom errors
app.use((err, req, res, next) => {
  if (err.status && err.msg) res.status(err.status).send({ msg: err.msg });
  next(err);
});

// handles unexpected errors - check test log for error codes
app.use((err, req, res, next) => {
  console.log(err, '<-- error');
  res.status(500).send({ msg: 'internal server error.' });
});

module.exports = app;
