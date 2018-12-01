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
    let answer = req.body;

    answers_logic.insertAnAnswer(answer)
        .then(data => res.status(201).json(data))
        .catch(e => {
            res.status(400).send(e.message);
            console.log(e.stack);
        });
});

router.delete('/answers/:id', (req, res) => {
    let answer_id = req.params.id;
    answers_logic.deleteAnAnswer(answer_id)
        .then(() => res.sendStatus(204))
        .catch(e => {
            res.status(404).send(e.message);
            console.log(e.stack);
        });
});


module.exports = router;