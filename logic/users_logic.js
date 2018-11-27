let users_db = require('../db/users_db');
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
  }
};

module.exports = users;
