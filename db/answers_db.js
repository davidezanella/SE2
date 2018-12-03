let db = require('./db');

let answers_db = {
    getAllAnswers: async function(user_id, task_id, type){
        let res = await db.executeQuery('SELECT answers.id FROM answers JOIN tasks ON task_id = tasks.id '
            + 'WHERE user_id::text LIKE $1 AND task_id::text LIKE $2 AND type::text LIKE $3;', [user_id, task_id, type]);

        return res.rows.map((x) => {
            return x.id;
        });
    },
    getAnAnswer: async function(answer_id){
        let res = await db.executeQuery('SELECT * FROM answers WHERE id = $1', [answer_id]);
        let answer = res.rows[0];
        answer.answers = [];

        let res_ans = await db.executeQuery('SELECT answer FROM answer_answers WHERE answer_id = $1', [answer_id]);
        for(let i of res_ans.rows)
            answer.answers.push(i.answer);

        return answer;
    },
    insertAnswer: async function(answer){
        let res = await db.executeQuery('INSERT INTO answers (user_id, task_id, submitted_at) VALUES ($1, $2, NOW()) RETURNING id', [answer.user_id, answer.task_id]);
        let answer_id = res.rows[0].id;
        
        for(let answ of answer.answers)
            await db.executeQuery('INSERT INTO answer_answers (answer_id, answer) VALUES ($1, $2)', [answer_id, answ]);
        
        return answer_id;
    },
    deleteAnswer: async function(answer_id){
        await db.executeQuery('DELETE FROM answer_answers WHERE answer_id = $1', [answer_id]);
        await db.executeQuery('DELETE FROM WHERE id = $1', [answer_id]);
    }
};

module.exports = answers_db;