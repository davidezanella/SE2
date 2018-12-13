const isNumber = require('is-number');
let results_db = require('../db/results_db');

let results = {
  //TODO: add tests when exams code is ready
  getAllResults: async function(exam, user) {
    if (exam === undefined || exam === null)
        exam = null;
    else if (!isNumber(exam))
        throw new Error("Invalid type of the exam filter parameter!");
    if (user === undefined || user === null)
        user = null;
    else if (!isNumber(user))
        throw new Error("Invalid type of the user filter parameter!");

    return await results_db.getAllResults(exam, user);
  }
};

module.exports = results;
