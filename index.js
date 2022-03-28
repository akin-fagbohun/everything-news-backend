const express = require('express');
const db = require('./db/connection');

const app = express();

// middleware
app.use(express.json());

app.get('/api/topics', async (req, res, next) => {
  try {
    const results = await db.query('SELECT * FROM topics')
    console.log(res);
    res.send(results.rows)
  } catch (err) {
    console.log(err);
  }
})



app.use((err, req, res, next) => {
  // ready for err handling.
})





module.exports = app;