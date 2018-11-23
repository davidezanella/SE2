var express = require('express');
var router = express.Router();

let users_logic = require('../logic/users_logic');

router.get('/users', (req, res) => {
    res.send("ok");
});

module.exports = router;