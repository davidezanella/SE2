let db = require('./db');

let tasks_db = {
    getAllTasks: async function(task_title, author_id, task_type){
        let res = await db.executeQuery('SELECT id FROM tasks WHERE ((title::text LIKE $1) OR (author::text LIKE $2) OR (type::text LIKE $3))', [task_title, author_id, task_type]);

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
    },

    deleteTask: async function (task_id){
        await db.executeQuery('DELETE FROM task_choices WHERE task_id = $1', [task_id]);
        await db.executeQuery('DELETE FROM tags WHERE task_id = $1', [task_id]);
        try{
        await db.executeQuery('DELETE FROM tasks WHERE id = $1', [task_id]);
        }
        catch(e){
        console.log(e);}
    },

    getTask: async function(task_id){
        let res = await db.executeQuery('SELECT * FROM tasks WHERE (id = $1)', [task_id]);
        let task = res.rows[0];
        //console.log(task);
        return task;
    }
};

module.exports = tasks_db;