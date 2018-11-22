var express = require('express');
var router = express.Router();

router.get('/tasks', (req, res) => {
    res.send("ok");
});

module.exports = router;