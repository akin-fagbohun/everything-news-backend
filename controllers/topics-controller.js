const { selectTopics } = require('../models/topics-model');

exports.getTopics = (req, res, next) => {
  selectTopics()
    .then((topics) => {
      console.log(topics, '<<<topics');
      res.status(200).send({ topics: topics });
    })
    .catch(next);
};
