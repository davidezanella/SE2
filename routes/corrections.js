var express = require('express');
var router = express.Router();

let corrections_db = require('../db/corrections_db');

router.get('/corrections', (req, res) => {
    res.send("ok");
});

module.exports = router;