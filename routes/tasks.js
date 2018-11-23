var express = require('express');
var router = express.Router();

let tasks_db = require('../db/tasks_db');

router.get('/tasks', (req, res) => {
    res.send("ok");
});

module.exports = router;