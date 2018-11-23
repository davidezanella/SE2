var express = require('express');
var router = express.Router();

let taPeerCorrections_db = require('../db/TA-peer-corrections_db');

router.get('/ta-peer-corrections', (req, res) => {
    res.send("ok");
});

module.exports = router;