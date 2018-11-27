const isNumber = require('is-number');
const isString = require('is-string');
let tasks_db = require('../db/tasks_db');

let tasks = {
    insertTask: async function (task) {
        let types = ["multi_choice", "single_choice", "open_answer", "true_false"];

        // Check task 
        if (!(typeof task === 'object'))
            throw new Error("Task is not valid.");
        // Check title type 
        if (!isString(task.task_title))
            throw new Error("Title is not valid!");
        // Check author type 
        if (!isNumber(task.author_id))
            throw new Error("Author ID is not valid!");
        // Check question type 
        if (!isString(task.question))
            throw new Error("Question is not valid!");
        // Check choices type
        if (!Array.isArray(task.choices))
            throw new Error("Choices are not valid!");
        // Check correct answers type
        if (!Array.isArray(task.correct_answer))
            throw new Error("Coorrect answers are not valid!");

        // Check task type 
        let tmp = false;
        for(let i=0; i<types.length; i++){
            if (task.task_type === types[i]) 
                tmp = true;
        }
        if(!tmp) throw new Error("Task type is not valid!");

        // Check choices
        if (task.choices.length === 0)
            throw new Error("No choices added.");

        // Check correct answers
        if (task.correct_answer.length === 0)
            throw new Error("No correct answers added.");

        if(tasks.length === 0)
            throw new Error("No tasks added!");
        
        return tasks_db.insertTask(task);
    },


    getAllTasks: async function (task_title, author_id, task_type) {
        return tasks_db.getAllTasks(task_title, author_id, task_type);
    }
};

module.exports = tasks;