var express = require('express');
var router = express.Router();

let results_logic = require('../logic/results_logic');

router.get('/results', (req, res) => {
    res.send("ok");
});

module.exports = router;