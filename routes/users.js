var express = require('express');
var router = express.Router();

let users_logic = require('../logic/users_logic');

router.get('/users', (req, res) => {
    // Optionally apply filters by email, surname, name.
    let name = req.query.name;
    let surname = req.query.surname;
    let email = req.query.email;

    users_logic.getAllUsers(name, surname, email)
        .then(data => res.json(data))
        .catch(e => {
            res.status(404).send(e.message);
        });
});

router.get('/users/:id', (req, res) => {
    // get a user by id, optionally by name, surname or email.
    let id = req.params.id;
    
    users_logic.getUserById(id)
        .then(data => res.json(data))
        .catch(e => {
            res.status(404).send(e.message);
        })
});

router.post('/users', (req, res) => {
    let username = req.query.username;
    let name = req.query.name;
    let surname = req.query.surname;
    let email = req.query.email;

    users_logic.createNewUser(username, name, surname, email)
        .then(data => res.status(201).json(data))
        .catch(e => {
            res.status(400).send(e.message);
        });
});

router.delete("/users/:id", (req, res) => {
    let id = req.params.id;

    users_logic.deleteUser(id)
        .then(data => res.json(data))       // Should return nothing actually...
        .catch(e => {
            res.status(400).send(e.message);
        });
});

module.exports = router;

// CREATE TABLE users (
//   id SERIAL not null,
//   username varchar(70) not null,
//   name varchar(70) not null,
//   surname varchar(70) not null,
//   email varchar(70) not null,
//   primary key(id)
// );
