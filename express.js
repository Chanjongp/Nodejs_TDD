var express = require('express')
var app = express()
var morgan = require('morgan');
var user = require('./api/user');

app.use(express.json());
app.use('/users', user);

if (process.env.NODE_ENV === 'test'){
  app.use(morgan('dev'));
}

module.exports = app;
