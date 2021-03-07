const express = require('express')
const app = express()
const port = 3000
var morgan = require('morgan');
var user = require('./api/user');

app.use(express.json())
app.use(morgan('dev'));
app.use('/users', user);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app;