const db = require('../db/connection');
const format = require('pg-format');
const articles = require('../db/data/test-data/articles');

// MISC models that are too few for seperate.
  // break out into separate model when necessary.

exports.selectTopics = () => {
  return db.query('SELECT * FROM topics')
  .then((topics) => {
    if (topics.rows.length === 0) {
      return Promise.reject({ status: 404, msg: 'URL not found.' })
    }
    return topics.rows;
  });
};

exports.selectUsers = () => {
  return db.query('SELECT * FROM users')
  .then((users) => {
    if (users.rows.length === 0) {
      return Promise.reject({ status: 404, msg: 'User not found.' })
    }
      return users.rows;
  });
};
