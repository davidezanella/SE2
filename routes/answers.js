var express = require('express');
var router = express.Router();

let answers_db = require('../db/answers_db');

router.get('/answers', (req, res) => {
    answers_db.getAllAnswers()
        .then(data => res.json(data.rows))
        .catch(e => {
            res.sendStatus(500);
            console.error(e.stack);
        });
});

module.exports = router;