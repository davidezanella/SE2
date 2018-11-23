var express = require('express');
var router = express.Router();

let peerCorrections_db = require('../db/peer-corrections_db');

router.get('/peer-corrections', (req, res) => {
    res.send("ok");
});

module.exports = router;