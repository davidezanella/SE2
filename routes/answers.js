var express = require('express');
var router = express.Router();

router.get('/answers', (req, res) => {
    res.send("ok");
});

module.exports = router;