let db = require('./db');

let taPeerCorrections_db = {
    insertTaPeerCorrection: async function (taPeerCorrection) {
        // Pass a no id object, and it creates a ta peer correction, specifying peer_correction_id, user_id as FK and answer_id and FK.
        let res = await db.executeQuery(
            'INSERT INTO taPeerCorrections (peer_correction_id, answer_id, text, user_id) VALUES ($1, $2, $3, $4) RETURNING id',
            [taPeerCorrection.peer_correction_id, taPeerCorrection.answer_id, taPeerCorrection.text, taPeerCorrection.user_id]
        );
        return res.rows[0].id;
    },

    deleteTaPeerCorrection: async function (ta_peer_correction_id) {
        // Delete a TA peer correction, specifying the ta peer correction id to delete.
        // TODO: shouldn't we put ';' at the end of the query?
        let res = await db.executeQuery(
            'DELETE FROM taPeerCorrections WHERE (id=$1)',
            [ta_peer_correction_id]
        );
        return true;
    },

    updateTaPeerCorrection: async function (taPeerCorrection) {
        // Update a ta peer correction given an object taPeerCorrection.
        let res = await db.executeQuery(
            'UPDATE taPeerCorrections SET peer_correction_id = $1, answer_id = $2, text = $3, user_id = $4 WHERE id = $5 RETURNING id',
            [taPeerCorrection.peer_correction_id, taPeerCorrection.answer_id, taPeerCorrection.text, taPeerCorrection.user_id, taPeerCorrection.id]
        );
        return res.rows[0].id;
    },

    getTaPeerCorrectionById: async function (ta_peer_correction_id) {
        let res = await db.executeQuery(
            'SELECT id, peer_correction_id, answer_id, text, user_id FROM taPeerCorrections WHERE id = $1',
            [ta_peer_correction_id]
        );
        return res.rows[0];
    }
};

module.exports = taPeerCorrections_db;