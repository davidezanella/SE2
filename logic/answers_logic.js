const isNumber = require('is-number');
let answers_db = require('../db/answers_db');

let answers = {
    insertAnAnswer: function (answer) {
        if (!isNumber(answer.user_id))
            throw new Error("User ID is not valid!");
        if (!isNumber(answer.task_id))
            throw new Error("Task ID is not valid!");
        if (!Array.isArray(answer.answers))
            throw new Error("Answers are not valid!");
        

        return answers_db.insertAnswer(answer)
    },
    getAllAnswers: function () {
        return answers_db.getAllAnswers();
    }
};

module.exports = answers;