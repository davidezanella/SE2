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

    getAllCorrections: async function (answer_id, user_id) {
        if (!isNumber(answer_id) && (!(answer_id == undefined)))
            throw new Error("Answer ID in the filter is not valid.");

        if (!isNumber(user_id) && (!(user_id == undefined)))
            throw new Error("User ID is not valid.");

        if (answer_id == undefined || answer_id == null)
            answer_id = '%'

        if (user_id == undefined || user_id == null)
            user_id = '%'

        return await corrections_db.getAllCorrections(answer_id, user_id);
    },

    deleteACorrection: async function (correction_id) {
        if (!isNumber(correction_id))
            throw new Error("Correction ID is not valid.");

        await corrections_db.deleteACorrection(correction_id);
    }
};

module.exports = corrections;