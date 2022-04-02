const db = require('../db/connection');
const format = require('pg-format');
const articles = require('../db/data/test-data/articles');

// MISC models that are too few for seperate.
  // break out into separate model when necessary.

// exports.selectApi = () => {
//   return db.query('SELECT *')
//   .then((topics) => {
//     if (topics.rows.length === 0) {
//       return Promise.reject({ status: 404, msg: 'URL not found.' })
//     }
//     return topics.rows;
//   });
// };

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

exports.addComment = (comment, article_id) => {
const { username, body } = comment;
const { article_id: id } = article_id;
return db.query(`
  INSERT INTO comments (author, body, article_id, votes, created_at)
  VALUES ($1, $2, $3, 0, NOW())
  RETURNING *;`, [username, body, id])
  .then((result) => {
    return result.rows[0];
  });
}