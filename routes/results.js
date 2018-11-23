var express = require('express');
var router = express.Router();

let results_db = require('../db/results_db');

router.get('/results', (req, res) => {
    res.send("ok");
});

module.exports = router;