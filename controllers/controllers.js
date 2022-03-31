const { articleData } = require('../db/data/test-data');
const articles = require('../db/data/test-data/articles');
const topics = require('../db/data/test-data/topics');
const { selectTopics, selectUsers, } = require('../models/models');

exports.getTopics = (req, res, next) => {
  selectTopics().then((topics) => {
    res.status(200).send(topics)
  });
};

exports.getUsers = (req, res, next) => {
  selectUsers().then((users) => {
    res.status(200).send(users)
  });
};



