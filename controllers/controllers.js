const { articleData, commentData } = require('../db/data/test-data');
const articles = require('../db/data/test-data/articles');
const topics = require('../db/data/test-data/topics');
const { selectApi, selectTopics, selectUsers, addComment, removeComment } = require('../models/models');


exports.getApi = (req, res, next) => {
  selectApi().then((api) => {
    res.status(200).send(api)
  })
  .catch(next)
};

exports.getTopics = (req, res, next) => {
  selectTopics().then((topics) => {
    res.status(200).send(topics)
  })
  .catch(next)
};

exports.getUsers = (req, res, next) => {
  selectUsers().then((users) => {
    res.status(200).send(users);
  })
  .catch(next)
};

exports.postComment = (req, res, next) => {
  addComment(req.body, req.params).then((comment) => {
    const { author: username , body } = comment
    res.status(201).send(body)
  })
  .catch(next)
}

exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params
  removeComment(comment_id).then(() => {
    res.status(204).send()
  })
}



