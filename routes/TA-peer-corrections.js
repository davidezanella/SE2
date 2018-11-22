var express = require('express');
var router = express.Router();

router.get('/ta-peer-corrections', (req, res) => {
    res.send("ok");
});

module.exports = router;