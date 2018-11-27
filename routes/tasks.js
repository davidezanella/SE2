var express = require('express');
var router = express.Router();

let tasks_logic = require('../logic/tasks_logic');

router.get('/tasks', (req, res) => {
    let task_title = req.query.task_title;
    let author_id = req.query.author_id;
    let question = req.query.question;
    let task_type = req.query.task_type;

    tasks_logic.getAllTasks(task_title, author_id, task_type).then(data => res.json(data)).catch(err => {
        res.send(404, err.message);
    });
});

router.post('/tasks', (req,res) => {
    let task = req.body.Task;

    tasks_logic.insertTask(task).then(data => res.json(data)).catch(e => {
        res.send(400, e.message);
    })
})

module.exports = router;