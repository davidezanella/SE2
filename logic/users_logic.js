let users_db = require('../db/users_db');
const isNumber = require('is-number');
let isString = function(s) {
  if (typeof s === 'string' || s instanceof String)
    return true;
  return false;
}
function sortNumber(a,b) {
    return a - b;
}

let users = {
    getAllUsers: async function (name, surname, email) {
        if (name === undefined || name === null)
            name = '%';
        if (!isString(name))
            throw new Error("Invalid type of the name filter parameter!");
        if (surname === undefined || surname === null)
            surname = '%';
        if (!isString(surname))
            throw new Error("Invalid type of the surname filter parameter!");
        if (email === undefined || email === null)
            email = '%';
        if (!isString(email))
            throw new Error("Invalid type of the email filter parameter!");

        return await users_db.getAllUsers(name, surname, email);
    },
    getUserById: async function(id){
        if (!isNumber(id) || id % 1 !== 0 || id < 0){
            throw new Error("The id must be a positive integer value.");
        }
        return await users_db.getUserById(id);
    },
    createNewUser: async function(username, name, surname, email) {
        if (!isString(username))
            throw new Error("Invalid type of the username parameter!");
        if (!isString(name))
            throw new Error("Invalid type of the name parameter!");
        if (!isString(surname))
            throw new Error("Invalid type of the surname parameter!");
        if (!isString(email))
            throw new Error("Invalid type of the email parameter!");

        return await users_db.createNewUser(username, name, surname, email);
    },
    deleteUser: async function(userId){
        if (!isNumber(userId) || userId < 0 || userId % 1 !== 0){
            throw new Error("The user id must be a positive integer!");
        }
        return await users_db.deleteUser(userId);
    },
    getExamsPerUser: async function(userId){
        if (!isNumber(userId) || userId < 0 || userId % 1 !== 0){
            throw new Error("The user id must be a positive integer!");
        }
        let student_exams = await users_db.getExamsPerStudent(userId);
        let TA_exmas = await users_db.getExamsPerTeachingAssistant(userId);
        var unique_exams = []; 

        student_exams.concat(TA_exmas);
        student_exams.sort(sortNumber);
        if (student_exams.length >= 1)
            unique_exams.push(student_exams[0]);
        for (let i = 1; i<student_exams.length; i++){
            if (student_exams[i] != student_exams[i-1] )
                unique_exams.push(student_exams[i]);
        }
        console.log(unique_exams);
        return unique_exams;
    }
};

module.exports = users;
