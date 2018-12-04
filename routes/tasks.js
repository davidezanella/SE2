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

router.delete('/tasks/:id', (req, res) => {
    let task_id = req.params.id;
    //console.log(task_id);
    tasks_logic.deleteATask(task_id).then(() => res.sendStatus(204)).catch(e => {res.status(404);});
});

router.get('/tasks/:id', (req, res) => {
    let task_id = req.params.id;
    //console.log(task_id);
    tasks_logic.getATask(task_id).then((data) => res.status(200).json(data)).catch(e => { res.sendStatus(404);});
});

module.exports = router;