const express = require('express');
const { getTopics } = require('./controllers/controllers');


const app = express();

// middleware
app.use(express.json());

app.get('/api/topics', getTopics);

app.use((err, req, res, next) => {
  // ready for err handling.
})





module.exports = app;