var express = require('express');
var router = express.Router();

let exams_logic = require('../logic/exams_logic');


router.get('/exams', (req, res) => {
    res.send("ok");
});

module.exports = router;