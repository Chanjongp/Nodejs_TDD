const express = require('express');
const morgan = require('morgan')
const app = express();


function commonmw(req, res, next) {
  console.log('commonmw');
  next(new Error('error ouccered'));
}

function errormw(err, req, res, next) {
  console.log(err.message);
  next();
}

app.use(commonmw);
app.use(errormw);


function logger(req, res, next){
  console.log('i am logger');
  next();
}

function logger2(req, res, next) {
  console.log('i am logger2');
  next();
}

app.use(logger);
app.use(logger2);
app.use(morgan('dev'));

app.listen(3000, function() {
  console.log('Server is running');
})