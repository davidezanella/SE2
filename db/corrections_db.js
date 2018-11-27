let db = require('./db');

let corrections_db = {

    insertACorrection: async function (correction) {
        let res = await db.executeQuery('INSERT INTO corrections (answer_id, text, score, user_id) VALUES ($1, $2, $3, $4) RETURNING id', [correction.answer_id, correction.text, correction.score, correction.user_id]);
        return res.rows[0].id;
    },

    getAllCorrections: async function (answer_id, user_id) {
        let res = await db.executeQuery('SELECT id FROM corrections WHERE ((answer_id::text LIKE $1) AND (user_id::text LIKE $2))', [answer_id, user_id]);
        return res.rows.map((x) => {
            return x.id;
        });
    }
};

module.exports = corrections_db;