var express = require('express');
var router = express.Router();

let taPeerCorrections_logic = require('../logic/TA-peer-corrections_logic');

router.get('/ta-peer-corrections', (req, res) => {
    res.send("ok");
});

module.exports = router;