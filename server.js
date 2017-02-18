var express = require('express');
var bodyParser = require('body-parser');

var app = module.exports = express();
app.use(bodyParser.json());

var userCtrl = require('./userCtrl');


app.get('/api/users', function(req, res) {
  if (req.query.favorites) {
    res.status(200).send(userCtrl.getUsersByFavorite(req.query.favorites));
  } else if (req.query.age) {
    res.status(200).send(userCtrl.getUsersByAgeLimit(req.query.age));
  } else if (req.query.lastname) {
    res.status(200).send(userCtrl.findUserByQuery('lastname', req.query.lastname));
  } else if (req.query.Email) {
    res.status(200).send(userCtrl.findUserByQuery('Email', req.query.Email));
  } else {
    res.status(200).send(userCtrl.readAll());
  }
});

app.get('/api/users/:id', function(req, res) {
  res.status(200).send(userCtrl.findUserById(Number(req.params.id)));
});

app.get('/api/admins', function(req, res) {
  res.status(200).send(userCtrl.getAdmins());
});

app.get('/api/nonadmins', function(req, res) {
  res.status(200).send(userCtrl.getNonAdmins());
});

app.put('/api/users/:id', function(req, res) {
  res.status(200).send(userCtrl.updateUser(Number(req.params.id), req.body));
});

app.post('/api/users', function(req, res) {
  res.status(200).send(userCtrl.createUser(req.body));
});

app.delete('/api/users/:id', function(req, res) {
  res.status(200).json(userCtrl.removeUser(Number(req.params.id)));
});

// app.listen(3000, function() {
//   console.log('Running port 3000');
// });
