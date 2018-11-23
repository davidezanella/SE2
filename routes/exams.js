var express = require('express');
var router = express.Router();

let exams_db = require('../db/exams_db');


router.get('/exams', (req, res) => {
    res.send("ok");
});

module.exports = router;