const db = require('../db/connection');
const fs = require('fs/promises');

// MISC models that are too few for seperate.
// break out into separate model when necessary.

exports.selectApi = async () => {
  const endpoints = await fs.readFile(`db/endpoints.json`, 'utf8');
  return endpoints;
};

exports.selectTopics = () => {
  return db.query('SELECT * FROM topics').then((topics) => {
    if (topics.rows.length === 0) {
      return Promise.reject({ status: 404, msg: 'URL not found.' });
    }
    return topics.rows;
  });
};

exports.selectUsers = () => {
  return db.query('SELECT * FROM users').then((users) => {
    if (users.rows.length === 0) {
      return Promise.reject({ status: 404, msg: 'User not found.' });
    }
    return users.rows;
  });
};

exports.addComment = (comment, article_id) => {
  const { username, body } = comment;
  const { article_id: id } = article_id;
  return db
    .query(
      `
  INSERT INTO comments (author, body, article_id, votes, created_at)
  VALUES ($1, $2, $3, 0, NOW())
  RETURNING *;`,
      [username, body, id]
    )
    .then((result) => {
      return result.rows[0];
    });
};

exports.removeComment = (id) => {
  return db
    .query('DELETE FROM comments WHERE comment_id = $1;', [id])
    .then((result) => {
      return result.rows;
    });
};
