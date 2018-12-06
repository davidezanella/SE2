const isNumber = require('is-number');
let taPeerCorrections_db = require('../db/TA-peer-corrections_db');

let taPeerCorrections = {
    
    // TODO: why have I made this?
    insertTaPeerCorrection: async function (taPeerCorrection) {
        // Verify that the parameters passed are a valid ta peer correction object.
        if (!(typeof taPeerCorrection === 'object')){
            throw new Error ("taPeerCorrection is not valid: must be object.");
        }
        if (!(isNumber(taPeerCorrection.peer_correction_id)) || taPeerCorrection.peer_correction_id % 1 != 0 || taPeerCorrection.peer_correction_id < 0){
            throw new Error("peer correction id is not valid: must be a Number");
        }
        if (!(isNumber(taPeerCorrection.answer_id)) || taPeerCorrection.answer_id % 1 != 0 || taPeerCorrection.answer_id < 0){
            throw new Error("answer id is not valid: must be a Number");
        }
        if (!(typeof taPeerCorrection.text === 'string') && taPeerCorrection.text.length > 0){
            throw new Error("text is not valid: must be a string");
        }
        if (!(isNumber(taPeerCorrection.user_id)) || taPeerCorrection.user_id % 1 != 0 || taPeerCorrection.user_id < 0){
            throw new Error("User id is not valid: must be a Number");
        }
        
        return await taPeerCorrections_db.insertTaPeerCorrection(taPeerCorrection);
    },

    
    deleteTaPeerCorrection: async function (ta_peer_correction_id) {
        // Check whether the ta peer correction id to delete is a number.
        if (!(isNumber(ta_peer_correction_id))){
            throw new Error("ta peer correction id is not valid: must be a Number");
        }
        
        return await taPeerCorrections_db.deleteTaPeerCorrection(ta_peer_correction_id);
    },

    updateTaPeerCorrection: async function (taPeerCorrection) {
        // Verify that the parameters passed are a valid ta peer correction object.
        if (!(typeof taPeerCorrection === 'object')){
            throw new Error ("taPeerCorrection is not valid: must be object.");
        }
        if (!(isNumber(taPeerCorrection.peer_correction_id)) || taPeerCorrection.peer_correction_id % 1 != 0 || taPeerCorrection.peer_correction_id < 0){
            // No non numbers, or negative or decimals.
            throw new Error("peer correction id is not valid: must be a Number, positive and non decimal");
        }
        if (!(isNumber(taPeerCorrection.answer_id)) || taPeerCorrection.answer_id % 1 != 0 || taPeerCorrection.answer_id < 0){
            throw new Error("answer id is not valid: must be a Number, positive and non decimal");
        }
        if (!(isNumber(taPeerCorrection.user_id)) || taPeerCorrection.user_id % 1 != 0 || taPeerCorrection.user_id < 0){
            throw new Error("User id is not valid: must be a Number, positive and non decimal");
        }
        if (!(isNumber(taPeerCorrection.id)) || taPeerCorrection.id % 1 != 0 || taPeerCorrection.id < 0){
            throw new Error("Id is not valid: must be a Number, positive and non decimal");
        }
        
        return taPeerCorrections_db.updateTaPeerCorrection(taPeerCorrection);
    },

    getTaPeerCorrectionById: async function (ta_peer_correction_id) {
        if (!(isNumber(ta_peer_correction_id))){
            // Checks for: infinity, null, undefined, NaN, '', ' ', 'asda', [1], [], function(){}, {}.
            throw new Error("peer correction id is not valid: must be a positive Number");
        }
        if (ta_peer_correction_id < 0){
            // id must be positive
            throw new Error("peer correction id is not valid: must be a positive Number");
        }
        if (ta_peer_correction_id % 1 != 0){
            // id must be integer
            throw new Error("peer correction id is not valid: must be an integer Number");
        }
        return taPeerCorrections_db.getTaPeerCorrectionById(ta_peer_correction_id);
    }

};

module.exports = taPeerCorrections;
