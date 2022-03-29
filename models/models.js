const db = require('../db/connection');

exports.selectTopics = () => {
  return db.query('SELECT * FROM topics').then((topics) => {
    return topics.rows;
  });
};
// exports.selectTopics = async (req, res) => {
//   try {
//     const results = await db.query('SELECT * FROM topics')
//     res.send(results.rows)
//   } catch (err) {
//     console.log(err);
//   }
// };