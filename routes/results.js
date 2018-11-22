var express = require('express');
var router = express.Router();

router.get('/results', (req, res) => {
    res.send("ok");
});

module.exports = router;