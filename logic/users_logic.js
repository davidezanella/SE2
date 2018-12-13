let users_db = require('../db/users_db');
const isNumber = require('is-number');
let isString = function(s) {
  if (typeof s === 'string' || s instanceof String)
    return true;
  return false;
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
    updateUserById: async function(id, username, name, surname, email) {
        var user;
        try {
          user = await this.getUserById(id);
        }
        catch (e) {
          throw new Error(e.message);
        }
        if (user == null || user.id == null) {
          console.log(user);
          throw new Error("User not found");
        }

        if (!isString(username))
            throw new Error("Invalid type of the username parameter!");
        if (!isString(name))
            throw new Error("Invalid type of the name parameter!");
        if (!isString(surname))
            throw new Error("Invalid type of the surname parameter!");
        if (!isString(email))
            throw new Error("Invalid type of the email parameter!");

        await users_db.editUser(id, username, name, surname, email);
        return {};
    }
};

module.exports = users;
