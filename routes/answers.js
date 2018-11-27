var express = require('express');
var router = express.Router();

let answers_logic = require('../logic/answers_logic');

router.get('/answers', (req, res) => {
    let user_id = req.query.user_id; 
    let task_id = req.query.task_id; 
    let type = req.query.type;

    answers_logic.getAllAnswers(user_id, task_id, type)
        .then(data => res.json(data))
        .catch(e => {
            res.status(404).send(e.message);
            console.log(e.stack);
        });
});

router.post('/answers', (req, res) => {
    let answer = req.body.Answer;

    answers_logic.insertAnAnswer(answer)
        .then(data => res.status(201).json(data))
        .catch(e => {
            res.status(400).send(e.message);
            console.log(e.stack);
        });
});


module.exports = router;