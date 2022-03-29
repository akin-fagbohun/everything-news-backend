const db = require('../db/connection');
const format = require('pg-format');

exports.selectTopics = () => {
  return db.query('SELECT * FROM topics').then((topics) => {
    return topics.rows;
  });
};

exports.selectArticleById = (id) => {
  return db.query('SELECT * FROM articles WHERE article_id = $1', [id])
}

exports.updateArticleById = (id, value) => {
  const query = format('UPDATE %I SET votes =  votes + $2 WHERE article_id = $1 RETURNING *;', 'articles');
  return db.query(query, [id, value]);
}