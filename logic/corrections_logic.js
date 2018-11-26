const isNumber = require('is-number');
let corrections_db = require('../db/corrections_db');

let corrections = {

    insertACorrection: async function (correction) {
        if (!isNumber(correction.answer_id))
            throw new Error("Answer ID is not valid.");
        if (!((typeof correction.text === 'string') || (correction.text instanceof String)))
            throw new Error("Text is not valid.");
        if (!isNumber(correction.score))
            throw new Error("Score is not valid.");
        if (!isNumber(correction.user_id))
            throw new Error("User ID is not valid.");

        return await corrections_db.insertACorrection(correction);
    },

    getAllCorrections: async function () {
        return await corrections_db.getAllCorrections();
    },
};

module.exports = corrections;