let db = require('./db');

let answers_db = {
    getAllAnswers: async function(){
        let res = await db.executeQuery('SELECT id FROM answers;');

        return res.rows.map((x) => {
            return x.id;
        });
    },
    insertAnswer: async function(answer){
        let res = await db.executeQuery('INSERT INTO answers (user_id, task_id, submitted_at) VALUES ($1, $2, NOW()) RETURNING id', [answer.user_id, answer.task_id]);
        let answer_id = res.rows[0].id;
        
        for(let answ of answer.answers)
            await db.executeQuery('INSERT INTO answer_answers (answer_id, answer) VALUES ($1, $2)', [answer_id, answ]);
        
        return answer_id;
    }
};

module.exports = answers_db;