const db = require('../db/connection');
const format = require('pg-format');

exports.selectArticles = (req) => {
  const { sort_by, order, topic } = req.query;

  sortableColumns = [
    'username',
    'created_at',
    'title',
    'topic',
    'votes',
    'comment_count',
  ];

  sortableOrder = ['asc', 'desc'];

  let sqlQuery = `SELECT * FROM articles`;

  // runs of request has a query.
  if (Object.keys(req.query).length) {
    // rejects invalid queries
    if (!sort_by && !order && !topic) {
      return Promise.reject({ status: 400, msg: 'Invalid query' });
    }

    // rejects invalid sort queries
    if (sort_by && !sortableColumns.includes(sort_by)) {
      return Promise.reject({ status: 400, msg: 'Invalid sort query' });
    }

    // rejects invalid order queries
    if (order && !sortableOrder.includes(order)) {
      return Promise.reject({ status: 400, msg: 'Invalid order query' });
    }

    // adds SQL topic sort parameters
    if (topic) {
      sqlQuery = `
      SELECT * FROM articles 
      WHERE topic LIKE '${topic}'`;
    }

    // adds SQL order parameters
    if (!order) {
      sqlQuery += ` ORDER BY ${sort_by} desc;`;
    } else if (order) {
      sqlQuery += ` ORDER BY ${sort_by} ${order};`;
    }
  }

  return db.query(sqlQuery).then((articles) => {
    return articles.rows;
  });
};

exports.selectArticleById = (id) => {
  return db
    .query(
      `
    SELECT COUNT(comment_id) AS comment_count, articles.*
    FROM articles
    LEFT JOIN comments
    ON comments.article_id = articles.article_id
    WHERE articles.article_id = $1
    GROUP BY articles.article_id;`,
      [id]
    )
    .then((article) => {
      if (article.rows.length === 0) {
        return Promise.reject({ status: 404, msg: 'Article Not Found' });
      }
      return article.rows;
    });
};

exports.selectArticleCommentsById = (id) => {
  return db
    .query(
      `
    SELECT comment_id, author AS username, body, created_at, votes
    FROM comments
    WHERE article_id = $1;`,
      [id]
    )
    .then((comment) => {
      if (comment.rows.length === 0) {
        return Promise.reject({ status: 404, msg: 'User Not Found' });
      }
      return comment.rows;
    });
};

// PATCH request models

exports.updateArticleById = (id, value) => {
  if (!value || typeof value !== 'number') {
    return Promise.reject({ status: 400, msg: 'Bad Request' });
  }
  const query = format(
    'UPDATE %I SET votes = votes + $2 WHERE article_id = $1 RETURNING *;',
    'articles'
  );
  return db.query(query, [id, value]);
};
