const express = require('express');
const { getTopics, getArticleById, getUsers, getArticles, patchArticleById, } = require('./controllers/controllers');


const app = express();

// middleware
app.use(express.json());

//get requests
app.get('/api/topics', getTopics);
app.get('/api/articles/:article_id', getArticleById);
app.get('/api/users', getUsers);
app.get('/api/articles', getArticles)

// patch requests
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