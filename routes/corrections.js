var express = require('express');
var router = express.Router();

let corrections_logic = require('../logic/corrections_logic');

router.get('/corrections', (req, res) => {
    res.send("ok");
});

module.exports = router;