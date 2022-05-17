const { addComment, removeComment } = require('../models/comments-model');

exports.postComment = (req, res, next) => {
  addComment(req.body, req.params)
    .then((comment) => {
      const { username: username, body } = comment;
      res.status(201).send(body);
    })
    .catch(next);
};

exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params;
  removeComment(comment_id).then(() => {
    res.status(204).send();
  });
};
