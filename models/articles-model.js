const db = require('../db/connection');
const format = require('pg-format');
const articles = require('../db/data/test-data/articles');

// GET request models

// exports.selectArticles = () => {
//   return db.query('SELECT * FROM articles')
//   .then((articles) => {
//     return articles.rows;
//   });
// };

exports.selectArticles = (req) => {
  const sortableColumns = ['author', 'created_at', 'title', 'topic', 'votes']
  const { query: urlQuery } = req;
  let sqlQuery = `SELECT * FROM articles`

  if (Object.keys(urlQuery).length !== 0) {
    // rejects invalid sort queries
    if (!sortableColumns.includes(urlQuery.sort_by)) {
      return Promise.reject({ status: 400, msg: 'Invalid sort query' });
    };
    // rejects invalid order queries
    if (!['asc', 'desc'].includes(urlQuery.order)) {
      return Promise.reject({ status: 400, msg: 'Invalid order query' });
    };
    // allows sorting by topic
    if (urlQuery.hasOwnProperty('topic')) {
      sqlQuery = `SELECT * FROM articles WHERE topic LIKE '${urlQuery.topic}'`
    }
    // adds SQL sorting parameters
    sqlQuery += ` ORDER BY ${urlQuery.sort_by} ${urlQuery.order};`;
  }
  
  return db.query(sqlQuery)
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
  };
  const query = format('UPDATE %I SET votes = votes + $2 WHERE article_id = $1 RETURNING *;', 'articles');
  return db.query(query, [id, value]);
}