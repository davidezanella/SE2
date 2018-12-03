const isNumber = require('is-number');
let answers_db = require('../db/answers_db');

let task_type = ['single_choice', 'multi_choice', 'open_answer', 'true_false'];

let answers = {
    insertAnAnswer: async function (answer) {
        if (!(typeof answer === 'object'))
            throw new Error("Answer object is not valid!");
        if (!isNumber(answer.user_id))
            throw new Error("User ID is not valid!");
        if (!isNumber(answer.task_id))
            throw new Error("Task ID is not valid!");
        if (!Array.isArray(answer.answers))
            throw new Error("Answers are not valid!");

        for (let i = 0; i < answer.answers.length; i++) {
            if (!(typeof answer.answers[i] === 'string' || answer.answers[i] instanceof String))
                throw new Error("Answers contains some invalid elements!");
        }

        if (answer.answers.length === 0)
            throw new Error("No answers sent!");

        return await answers_db.insertAnswer(answer);
    },
    getAllAnswers: async function (user_id, task_id, type) {
        if (user_id === undefined || user_id === null)
            user_id = '%';
        else if (!isNumber(user_id))
            throw new Error("Invalid type of the user_id filter parameter!");
        if (task_id === undefined || task_id === null)
            task_id = '%';
        else if (!isNumber(task_id))
            throw new Error("Invalid type of the task_id filter parameter!");
        if (type === undefined || type === null)
            type = '%';
        else if (!task_type.includes(type))
            throw new Error("Invalid task type filter parameter!");

        return await answers_db.getAllAnswers(user_id, task_id, type);
    },
    getAnAnswer: async function(answer_id){
        if (!isNumber(answer_id))
            throw new Error("Invalid answer id!");
    
        return await answers_db.getAnAnswer(answer_id);
    },
    deleteAnAnswer: async function(answer_id){
        if (!isNumber(answer_id))
            throw new Error("Invalid answer id!");
        
        await answers_db.deleteAnswer(answer_id);
    }
};

module.exports = answers;