var express = require('express');
var router = express.Router();

router.get('/corrections', (req, res) => {
    res.send("ok");
});

module.exports = router;