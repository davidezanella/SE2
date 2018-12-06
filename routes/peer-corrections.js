var express = require('express');
var router = express.Router();

let peerCorrections_logic = require('../logic/peer-corrections_logic');

router.get('/peer-corrections', (req, res) => {
    res.send("ok");
});

module.exports = router;