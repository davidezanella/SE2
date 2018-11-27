let db = require('./db');

let tasks_db = {
    getAllTasks: async function(){
        let res = await db.executeQuery('SELECT id FROM tasks;');

        return res.rows.map((x) => {
            return x.id;
        });
    },
    insertTask: async function(task){
        let res = await db.executeQuery('INSERT INTO tasks (title, author, question, type) VALUES ($1, $2, $3, $4) RETURNING id', [task.task_title, task.author_id, task.question, task.task_type]);

        let  id = res.rows[0].id;

        for(let i=0; i<task.choices.length; i++){
            let res = await db.executeQuery('INSERT INTO task_choices (task_id, choice, correct) VALUES ($1, $2, $3)', [id, task.choices[i], task.correct_answer.includes(task.choices[i]) ]);
        };

        return res.rows[0].id;
    }
};

module.exports = tasks_db;