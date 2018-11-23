var express = require('express');
var router = express.Router();

let tasks_logic = require('../logic/tasks_logic');

router.get('/tasks', (req, res) => {
    res.send("ok");
});

module.exports = router;