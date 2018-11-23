let db = require('./db');

let answers_db = {
    getAllAnswers: async function(){
        let res = await db.executeQuery('SELECT * FROM answers;');
        return res;
    }
};

module.exports = answers_db;