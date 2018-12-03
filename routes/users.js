var express = require('express');
var router = express.Router();

let users_logic = require('../logic/users_logic');

router.get('/users', (req, res) => {
  let name = req.query.name;
  let surname = req.query.surname;
  let email = req.query.email;

  users_logic.getAllUsers(name, surname, email)
    .then(data => res.json(data))
    .catch(e => {
      res.status(404).send(e.message);
      console.log(e.stack);
    });
});

router.post('/users', (req, res) => {
  let username = req.body.username;
  let name = req.body.name;
  let surname = req.body.surname;
  let email = req.body.email;

  users_logic.createNewUser(username, name, surname, email)
      .then(data => res.status(201).json(data))
      .catch(e => {
          res.status(400).send(e.message);
          console.log(e.stack);
      });
});

module.exports = router;
