const isNumber = require('is-number');
let answers_db = require('../db/answers_db');

let answers = {
    insertAnAnswer: async function (answer) {
        if(!(typeof answer === 'object'))
            throw new Error("Answer object is not valid!");
        if (!isNumber(answer.user_id))
            throw new Error("User ID is not valid!");
        if (!isNumber(answer.task_id))
            throw new Error("Task ID is not valid!");
        if (!Array.isArray(answer.answers))
            throw new Error("Answers are not valid!");
        
        for(let i = 0; i < answer.answers.length; i++){
            if(!(typeof answer.answers[i] === 'string' || answer.answers[i] instanceof String))
                throw new Error("Answers contains some invalid elements!");
        }

        if(answer.answers.length === 0)
            throw new Error("No answers sent!");

        return await answers_db.insertAnswer(answer);
    },
    getAllAnswers: async function () {
        return await answers_db.getAllAnswers();
    }
};

module.exports = answers;