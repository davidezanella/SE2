var express = require('express');
var router = express.Router();

let answers_logic = require('../logic/answers_logic');

router.get('/answers', (req, res) => {
    answers_logic.getAllAnswers()
        .then(data => res.json(data))
        .catch(e => {
            res.send(404, e.message);
            console.error(e.stack);
        });
});

router.post('/answers', (req, res) => {
    let answer = req.body.Answer;

    answers_logic.insertAnAnswer(answer)
        .then(data => res.json(data))
        .catch(e => {
            res.send(400, e.message);
            console.error(e.stack);
        });
});


module.exports = router;