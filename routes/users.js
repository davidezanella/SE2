var express = require('express');
var router = express.Router();

let users_db = require('../db/users_db');

router.get('/users', (req, res) => {
    res.send("ok");
});

module.exports = router;