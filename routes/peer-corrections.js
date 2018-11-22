var express = require('express');
var router = express.Router();

router.get('/peer-corrections', (req, res) => {
    res.send("ok");
});

module.exports = router;