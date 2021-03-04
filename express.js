const express = require('express')
const app = express()
const port = 3000
var morgan = require('morgan');
var users = [
  {id: 1, name : 'alice'},
  {id: 2, name : 'bek'},
  {id: 3, name : 'chris'},
]

app.use(morgan('dev'));

app.get('/users', (req, res) => {
  req.query.limit = req.query.limit || 10;
  console.log(req.query.limit);
  const limit = parseInt(req.query.limit, 10); //query 값으로 들어오는 숫자는 Str "2"이기 때문에 Int로 바꿔줘야 함
  if(Number.isNaN(limit)) { // limit가 숫자가 아니면
    return res.status(400).end();
  } else {
    res.json(users.slice(0, limit));  
  }
  // res.json(users)
})

app.get('/user/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if(Number.isNaN(id)){
    return res.status(400).end();
  }
  const user = users.filter((user) => {return user.id === id})[0];
  if(!user){
      return res.status(404).end();
  } else {
    res.json(user); 
  }
}) 

app.delete('/user/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if(Number.isNaN(id)){
    return res.status(400).end();
  }
  users = users.filter((user) => {return user.id !== id});
  return res.status(204).end()
})

app.post('/users', function(req, res) {
  res.send(users)
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app;