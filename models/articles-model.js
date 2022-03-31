const db = require('../db/connection');
const format = require('pg-format');
const articles = require('../db/data/test-data/articles');

// GET request models

exports.selectArticles = () => {
  return db.query('SELECT * FROM articles').then((articles) => {
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
};

exports.selectArticleCommentsById = (id) => {
  return db.query(`
    SELECT comment_id, author, body, created_at, votes
    FROM comments
    WHERE article_id = $1;`, [id])
};

// PATCH request models

exports.updateArticleById = (id, value) => {
  const query = format('UPDATE %I SET votes =  votes + $2 WHERE article_id = $1 RETURNING *;', 'articles');
  return db.query(query, [id, value]);
}