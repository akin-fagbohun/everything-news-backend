const db = require('../db/connection');
const format = require('pg-format');
const articles = require('../db/data/test-data/articles');

// GET request models

exports.selectArticles = () => {
  return db.query('SELECT * FROM articles')
  .then((articles) => {
    return articles.rows;
  });
};

exports.selectArticleById = (id) => {
  return db.query(`
    SELECT COUNT(comment_id) AS comment_count, articles.*
    FROM articles
    LEFT JOIN comments
    ON comments.article_id = articles.article_id
    WHERE articles.article_id = $1
    GROUP BY articles.article_id;`, [id])
    .then((article) => {
      if (article.rows.length === 0) {
        return Promise.reject({ status: 404, msg: 'Not Found' })
      }
      return article.rows;
    });
};

exports.selectArticleCommentsById = (id) => {
  return db.query(`
    SELECT comment_id, author, body, created_at, votes
    FROM comments
    WHERE article_id = $1;`, [id])
    .then((comment) => {
      if (comment.rows.length === 0) {
        return Promise.reject({ status: 404, msg: 'Not Found' })
      }
      return comment.rows;
    })
};

// PATCH request models

exports.updateArticleById = (id, value) => {
  if (!value || typeof value !== 'number') {
    return Promise.reject({ status: 400, msg: 'Bad Request'})
  }
  const query = format('UPDATE %I SET votes = votes + $2 WHERE article_id = $1 RETURNING *;', 'articles');
  return db.query(query, [id, value]);
}