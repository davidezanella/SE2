var express = require('express');
var router = express.Router();

router.get('/exams', (req, res) => {
    res.send("ok");
});

module.exports = router;