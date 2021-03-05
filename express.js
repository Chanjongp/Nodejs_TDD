const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3000
var morgan = require('morgan');
var users = [
  {id: 1, name : 'alice'},
  {id: 2, name : 'bek'},
  {id: 3, name : 'chris'},
]

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/users', (req, res) => {
  req.query.limit = req.query.limit || 10;
  const limit = parseInt(req.query.limit, 10); //query 값으로 들어오는 숫자는 Str "2"이기 때문에 Int로 바꿔줘야 함
  if(Number.isNaN(limit)) { // limit가 숫자가 아니면
    return res.status(400).end();
  } else {
    res.json(users.slice(0, limit));  
  }
})

app.get('/users/:id', (req, res) => {
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

app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if(Number.isNaN(id)){
    return res.status(400).end();
  }
  users = users.filter((user) => {return user.id !== id});
  return res.status(204).end()
})

app.post('/users', function(req, res) {
  const name = req.body.name;
  if(!name) {  return res.status(400).end()}

  const isConflict = users.filter((user) => {return user.name === name}).length;
  if(isConflict){
    return res.status(409).end()
  }
  const id = Date.now();
  const user = {id, name};
  users.push(user); 
  res.status(201).json(user)
})

app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if(Number.isNaN(id)){ return res.status(400).end() }
  const name = req.body.name;
  if(!name) {  return res.status(400).end() }
  const user = users.filter((user) => {return  user.id === id})[0];
  if(!user) { return res.status(404).end() }
  const isConflict = users.filter((user) => {return user.name === name}).length;
  if(isConflict) {return res.status(409).end()}
  
  user.name = name;
  res.json(user);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app;