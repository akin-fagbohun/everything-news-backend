const db = require('../db/connection');

exports.selectUsers = () => {
  return db.query('SELECT * FROM users').then((users) => {
    if (users.rows.length === 0) {
      return Promise.reject({ status: 404, msg: 'Users not found.' });
    }
    return users.rows;
  });
};

const name = 'akin';
