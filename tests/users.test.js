let users_logic = require('../logic/users_logic');
let fetch = require('node-fetch');
let emailValidator = require('email-validator');
let db = require("../db/db")

/* API calls test */
let api;
beforeAll(() => {
    api = require('../api');
});

afterAll(() => {
    api.close();
});

/* /users GET */
test('No params /users GET', async () => {
  let name = undefined;
  let surname = undefined;
  let email = undefined;

  let response = await users_logic.getAllUsers(name, surname, email);

  expect(response).toBeInstanceOf(Array);
  for (let i of response)
      expect(typeof i).toBe('number');
});
test('Name params /users GET', async () => {
  let name = "Andrea";
  let surname = undefined;
  let email = undefined;

  let response = await users_logic.getAllUsers(name, surname, email);

  expect(response).toBeInstanceOf(Array);
  for (let i of response)
      expect(typeof i).toBe('number');
});
test('surname params /users GET', async () => {
  let name = undefined;
  let surname = "draane";
  let email = undefined;

  let response = await users_logic.getAllUsers(name, surname, email);

  expect(response).toBeInstanceOf(Array);
  for (let i of response)
      expect(typeof i).toBe('number');
});
test('Email params /users GET', async () => {
  let name = undefined;
  let surname = undefined;
  let email = "andraane@libero.it";

  let response = await users_logic.getAllUsers(name, surname, email);

  expect(response).toBeInstanceOf(Array);
  for (let i of response)
      expect(typeof i).toBe('number');
});
test('Name and surname params /users GET', async () => {
  let name = "Andrea";
  let surname = "draane";
  let email = undefined;

  let response = await users_logic.getAllUsers(name, surname, email);

  expect(response).toBeInstanceOf(Array);
  for (let i of response)
      expect(typeof i).toBe('number');
});
test('Name and email params /users GET', async () => {
  let name = "Andrea";
  let surname = undefined;
  let email = "andraane@libero.it";

  let response = await users_logic.getAllUsers(name, surname, email);

  expect(response).toBeInstanceOf(Array);
  for (let i of response)
      expect(typeof i).toBe('number');
});
test('surname and email params /users GET', async () => {
  let name = undefined;
  let surname = "draane";
  let email = "andraane@libero.it";

  let response = await users_logic.getAllUsers(name, surname, email);

  expect(response).toBeInstanceOf(Array);
  for (let i of response)
      expect(typeof i).toBe('number');
});
test('All params /users GET', async () => {
  let name = "Andrea";
  let surname = "draane";
  let email = "andrea@test.it";

  let response = await users_logic.getAllUsers(name, surname, email);

  expect(response).toBeInstanceOf(Array);
  for (let i of response)
      expect(typeof i).toBe('number');
});

// Wrong parameters → expecting Error
test('Name is number /users GET', () => {
  let name = 7;
  let surname = undefined;
  let email = undefined;

  expect(users_logic.getAllUsers(name, surname, email)).rejects.toBeInstanceOf(Error);
});
test('surname is number /users GET', () => {
  let name = undefined;
  let surname = 25;
  let email = undefined;

  expect(users_logic.getAllUsers(name, surname, email)).rejects.toBeInstanceOf(Error);
});
test('Email is number /users GET', () => {
  let name = undefined;
  let surname = undefined;
  let email = 42;

  expect(users_logic.getAllUsers(name, surname, email)).rejects.toBeInstanceOf(Error);
});
test('Name is Object /users GET', () => {
  let name = {};
  let surname = undefined;
  let email = undefined;

  expect(users_logic.getAllUsers(name, surname, email)).rejects.toBeInstanceOf(Error);
});
test('surname is Object /users GET', () => {
  let name = undefined;
  let surname = {};
  let email = undefined;

  expect(users_logic.getAllUsers(name, surname, email)).rejects.toBeInstanceOf(Error);
});
test('Email is Object /users GET', () => {
  let name = undefined;
  let surname = undefined;
  let email = {};

  expect(users_logic.getAllUsers(name, surname, email)).rejects.toBeInstanceOf(Error);
});
test('Name is Array /users GET', () => {
  let name = ['andrea'];
  let surname = undefined;
  let email = undefined;

  expect(users_logic.getAllUsers(name, surname, email)).rejects.toBeInstanceOf(Error);
});
test('surname is Array /users GET', () => {
  let name = undefined;
  let surname = ['draane'];
  let email = undefined;

  expect(users_logic.getAllUsers(name, surname, email)).rejects.toBeInstanceOf(Error);
});
test('Email is Array /users GET', () => {
  let name = undefined;
  let surname = undefined;
  let email = ["andrea@test.it"];

  expect(users_logic.getAllUsers(name, surname, email)).rejects.toBeInstanceOf(Error);
});


/* Users GET all */
test('Get all users via API', async () => {
    let name = undefined;
    let surname = undefined;
    let email = undefined;

    let response = await fetch('http://localhost:3000/v1/users');

    let json = await response.json();

    expect(response.status).toBe(200);
    expect(json).toBeInstanceOf(Array);
    for (let i of json)
        expect(typeof i).toBe('number');
});
test('Get users with filters via API', async () => {
    let name = "andrea";
    let surname = "draane";
    let email = "andre@test.it";

    let response = await fetch('http://localhost:3000/v1/users?name=' + name + '&surname=' + surname + '&email=' + email);

    let json = await response.json();

    expect(response.status).toBe(200);
    expect(json).toBeInstanceOf(Array);
    for (let i of json)
        expect(typeof i).toBe('number');
});


// Get user by id
test("Get by id, id is null", async () => {
  var id = null;
  expect(users_logic.getUserById(id)).rejects.toBeInstanceOf(Error);
});
test("Get by id, id is undefined", async () => {
  var id = undefined;
  expect(users_logic.getUserById(id)).rejects.toBeInstanceOf(Error);
});
test("Get by id, id is NaN", async () => {
  var id = NaN;
  expect(users_logic.getUserById(id)).rejects.toBeInstanceOf(Error);
});
test("Get by id, id is < 0", async () => {
  var id = -1;
  expect(users_logic.getUserById(id)).rejects.toBeInstanceOf(Error);
});
test("Get by id, id is decimal", async () => {
  var id = 0.5;
  expect(users_logic.getUserById(id)).rejects.toBeInstanceOf(Error);
});
test("Get by id, id is a non empty string", async () => {
  var id = "ciao";
  expect(users_logic.getUserById(id)).rejects.toBeInstanceOf(Error);
});
test("Get by id, id is an empty string", async () => {
  var id = "";
  expect(users_logic.getUserById(id)).rejects.toBeInstanceOf(Error);
});
test("Get by id, id is a non empty list", async () => {
  var id = [1];
  expect(users_logic.getUserById(id)).rejects.toBeInstanceOf(Error);
});
test("Get by id, id is an empty list", async () => {
  var id = [];
  expect(users_logic.getUserById(id)).rejects.toBeInstanceOf(Error);
});
test("Get by id, id is a non empty object", async () => {
  var id = {"a": 1};
  expect(users_logic.getUserById(id)).rejects.toBeInstanceOf(Error);
});
test("Get by id, id is an empty object", async () => {
  var id = {};
  expect(users_logic.getUserById(id)).rejects.toBeInstanceOf(Error);
});
test("Get by id, id is Infinity", async () => {
  var id = Infinity;
  expect(users_logic.getUserById(id)).rejects.toBeInstanceOf(Error);
});
test("Get by id, id is - infinity", async () => {
  var id = - Infinity;
  expect(users_logic.getUserById(id)).rejects.toBeInstanceOf(Error);
});

/*
 Valid getUserById: when the id is a positive int, returns a user object 
 {
   id: number
   surname: string
   email: email string
   name: string
 }

*/

test("Get user by id, with a valid id, returna a valid user object.", async() => {
  var id = await users_logic.createNewUser("test_username", "test_name", "test_surname", "test.email@test.com");
  
  var user = await users_logic.getUserById(id);
  // test id
  expect(user.id).not.toBeNaN();
  expect(user.id).not.toBeNull();
  expect(user.id).not.toBeUndefined();
  expect(typeof user.id).toBe('number');
  expect(user.id).toBeGreaterThanOrEqual(0);
  // test username
  expect(user.username).not.toBeNull();
  expect(user.username).not.toBeUndefined();
  expect(typeof user.username).toBe('string');
  // test name
  expect(user.name).not.toBeNull();
  expect(user.name).not.toBeUndefined();
  expect(typeof user.name).toBe('string');
  // test surname
  expect(user.surname).not.toBeNull();
  expect(user.surname).not.toBeUndefined();
  expect(typeof user.surname).toBe('string');
  // test email
  expect(user.email).not.toBeNull();
  expect(user.email).not.toBeUndefined();
  expect(typeof user.email).toBe('string');
  expect(emailValidator.validate(user.email)).toBe(true);
  await db.executeQuery('DELETE FROM users WHERE id = $1', [id]);
        
});

/*
############### 
  DELETE user 
###############
*/

test("delete a user with id null", async () => {
  var id = null;
  expect(users_logic.deleteUser(id)).rejects.toBeInstanceOf(Error);
});
test("delete a user with id undefined", async () => {
  var id = undefined;
  expect(users_logic.deleteUser(id)).rejects.toBeInstanceOf(Error);
});
test("delete a user with id < 0", async () => {
  var id = -1;
  expect(users_logic.deleteUser(id)).rejects.toBeInstanceOf(Error);
});
test("delete a user with id NaN", async () => {
  var id = NaN;
  expect(users_logic.deleteUser(id)).rejects.toBeInstanceOf(Error);
});
test("delete a user with id decimal", async () => {
  var id = 0.5;
  expect(users_logic.deleteUser(id)).rejects.toBeInstanceOf(Error);
});
test("delete a user with id empty string", async () => {
  var id = "";
  expect(users_logic.deleteUser(id)).rejects.toBeInstanceOf(Error);
});
test("delete a user with id non empty string", async () => {
  var id = "ciao";
  expect(users_logic.deleteUser(id)).rejects.toBeInstanceOf(Error);
});
test("delete a user with id empty list", async () => {
  var id = [];
  expect(users_logic.deleteUser(id)).rejects.toBeInstanceOf(Error);
});
test("delete a user with id empty object", async () => {
  var id = {};
  expect(users_logic.deleteUser(id)).rejects.toBeInstanceOf(Error);
});
test("delete a user with id non empty object", async () => {
  var id = {"a": 1};
  expect(users_logic.deleteUser(id)).rejects.toBeInstanceOf(Error);
});
test("delete a user with id Infinity", async () => {
  var id = Infinity;
  expect(users_logic.deleteUser(id)).rejects.toBeInstanceOf(Error);
});
test("delete a user with id - Infinity", async () => {
  var id = - Infinity;
  expect(users_logic.deleteUser(id)).rejects.toBeInstanceOf(Error);
});

// DELETE a successfully inserted user:
test("Delete a successfully inserted user", async () => {
  var id = await users_logic.createNewUser("test_username", "test_name", "test_surname", "test@testemail.com");
  await users_logic.deleteUser(id);
  expect(users_logic.getUserById(id)).toBeTruthy();
});

/* /users POST */
test('All params /users POST', async () => {
  let username = "draane";
  let name = "andrea";
  let surname = "dalla costa";
  let email = "andrea@test.me";

  let response = await users_logic.createNewUser(username, name, surname, email);

  expect(typeof response).toBe('number');
});
test('Username is undefined/null /users POST', () => {
  let username = undefined;
  let name = "andrea";
  let surname = "dalla costa";
  let email = "andrea@test.me";

  expect(users_logic.createNewUser(username, name, surname, email)).rejects.toBeInstanceOf(Error);
  username = null;
  expect(users_logic.createNewUser(username, name, surname, email)).rejects.toBeInstanceOf(Error);
});
test('Name is undefined/null /users POST', () => {
  let username = "draane";
  let name = undefined;
  let surname = "dalla costa";
  let email = "andrea@test.me";

  expect(users_logic.createNewUser(username, name, surname, email)).rejects.toBeInstanceOf(Error);
  name = null;
  expect(users_logic.createNewUser(username, name, surname, email)).rejects.toBeInstanceOf(Error);
});
test('Surname is undefined/null /users POST', () => {
  let username = "draane";
  let name = "andrea";
  let surname = undefined;
  let email = "andrea@test.me";

  expect(users_logic.createNewUser(username, name, surname, email)).rejects.toBeInstanceOf(Error);
  surname = null;
  expect(users_logic.createNewUser(username, name, surname, email)).rejects.toBeInstanceOf(Error);
});
test('Email is undefined/null /users POST', () => {
  let username = "draane";
  let name = "andrea";
  let surname = "dalla costa";
  let email = undefined;

  expect(users_logic.createNewUser(username, name, surname, email)).rejects.toBeInstanceOf(Error);
  email = null;
  expect(users_logic.createNewUser(username, name, surname, email)).rejects.toBeInstanceOf(Error);
});

test('Username is not string /users POST', () => {
  let username = ["draane"];
  let name = "andrea";
  let surname = "dalla costa";
  let email = "andrea@test.me";

  expect(users_logic.createNewUser(username, name, surname, email)).rejects.toBeInstanceOf(Error);
  username = {};
  expect(users_logic.createNewUser(username, name, surname, email)).rejects.toBeInstanceOf(Error);
});
test('Name is not string /users POST', () => {
  let username = "draane";
  let name = ["andrea"];
  let surname = "dalla costa";
  let email = "andrea@test.me";

  expect(users_logic.createNewUser(username, name, surname, email)).rejects.toBeInstanceOf(Error);
  name = {};
  expect(users_logic.createNewUser(username, name, surname, email)).rejects.toBeInstanceOf(Error);
});
test('Surname is not string /users POST', () => {
  let username = "draane";
  let name = "andrea";
  let surname = ["dalla costa"];
  let email = "andrea@test.me";

  expect(users_logic.createNewUser(username, name, surname, email)).rejects.toBeInstanceOf(Error);
  surname = {};
  expect(users_logic.createNewUser(username, name, surname, email)).rejects.toBeInstanceOf(Error);
});
test('Email is not string /users POST', () => {
  let username = "draane";
  let name = "andrea";
  let surname = "dalla costa";
  let email = ["andrea@test.me"];

  expect(users_logic.createNewUser(username, name, surname, email)).rejects.toBeInstanceOf(Error);
  email = {};
  expect(users_logic.createNewUser(username, name, surname, email)).rejects.toBeInstanceOf(Error);
});



/* Users POST */
test('Insert a valid user via API', async () => {
  let body = {
    username: "draane",
    name: "andrea",
    surname: "dalla costa",
    email: "andrea@test.me"
   };

  let response = await fetch('http://localhost:3000/v1/users', {
      method: 'post',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
  });

  let text = await response.text();

  if (response.status === 201)
    expect(typeof text).toBeInstanceOf('number');
});

// UPDATE USER
let _id = null;
async function get_id () {
  if (_id !== null) return _id;
  let users_ids = await users_logic.getAllUsers();
  let id;
  if (users_ids.length > 0)
    id = users_ids[0];
  else
    id = await users_logic.createNewUser("user", "name", "surn", "mail");
  _id = id;
  return id;
}

test('All params /users/id PUT', async () => {
  let id = await get_id();
  let username = "draane";
  let name = "andrea";
  let surname = "dalla costa";
  let email = "andrea@test.me";

  let response = await users_logic.updateUserById(id, username, name, surname, email);

  expect(response).toEqual({});
});
test('Username is undefined/null /users PUT', async () => {
  let id = await get_id();
  let username = undefined;
  let name = "andrea";
  let surname = "dalla costa";
  let email = "andrea@test.me";

  expect(users_logic.updateUserById(id, username, name, surname, email)).rejects.toBeInstanceOf(Error);
  username = null;
  expect(users_logic.updateUserById(id, username, name, surname, email)).rejects.toBeInstanceOf(Error);
});
test('Name is undefined/null /users PUT', async () => {
  let id = await get_id();
  let username = "draane";
  let name = undefined;
  let surname = "dalla costa";
  let email = "andrea@test.me";

  expect(users_logic.updateUserById(id, username, name, surname, email)).rejects.toBeInstanceOf(Error);
  name = null;
  expect(users_logic.updateUserById(id, username, name, surname, email)).rejects.toBeInstanceOf(Error);
});
test('Surname is undefined/null /users PUT', async () => {
  let id = await get_id();
  let username = "draane";
  let name = "andrea";
  let surname = undefined;
  let email = "andrea@test.me";

  expect(users_logic.updateUserById(id, username, name, surname, email)).rejects.toBeInstanceOf(Error);
  surname = null;
  expect(users_logic.updateUserById(id, username, name, surname, email)).rejects.toBeInstanceOf(Error);
});
test('Email is undefined/null /users PUT', async () => {
  let id = await get_id();
  let username = "draane";
  let name = "andrea";
  let surname = "dalla costa";
  let email = undefined;

  expect(users_logic.updateUserById(id, username, name, surname, email)).rejects.toBeInstanceOf(Error);
  email = null;
  expect(users_logic.updateUserById(id, username, name, surname, email)).rejects.toBeInstanceOf(Error);
});

test('Username is not string /users PUT', async () => {
  let id = await get_id();
  let username = ["draane"];
  let name = "andrea";
  let surname = "dalla costa";
  let email = "andrea@test.me";

  expect(users_logic.updateUserById(id, username, name, surname, email)).rejects.toBeInstanceOf(Error);
  username = {};
  expect(users_logic.updateUserById(id, username, name, surname, email)).rejects.toBeInstanceOf(Error);
});
test('Name is not string /users PUT', async () => {
  let id = await get_id();
  let username = "draane";
  let name = ["andrea"];
  let surname = "dalla costa";
  let email = "andrea@test.me";

  expect(users_logic.updateUserById(id, username, name, surname, email)).rejects.toBeInstanceOf(Error);
  name = {};
  expect(users_logic.updateUserById(id, username, name, surname, email)).rejects.toBeInstanceOf(Error);
});
test('Surname is not string /users PUT', async () => {
  let id = await get_id();
  let username = "draane";
  let name = "andrea";
  let surname = ["dalla costa"];
  let email = "andrea@test.me";

  expect(users_logic.updateUserById(id, username, name, surname, email)).rejects.toBeInstanceOf(Error);
  surname = {};
  expect(users_logic.updateUserById(id, username, name, surname, email)).rejects.toBeInstanceOf(Error);
});
test('Email is not string /users PUT', async () => {
  let id = await get_id();
  let username = "draane";
  let name = "andrea";
  let surname = "dalla costa";
  let email = ["andrea@test.me"];

  expect(users_logic.updateUserById(id, username, name, surname, email)).rejects.toBeInstanceOf(Error);
  email = {};
  expect(users_logic.updateUserById(id, username, name, surname, email)).rejects.toBeInstanceOf(Error);
});



/* Users PUT */
test('Update a valid user via API', async () => {
  let id = await get_id();
  let body = {
    id: id,
    username: "draane",
    name: "andrea",
    surname: "dalla costa",
    email: "andrea@test.me"
   };

  let response = await fetch('http://localhost:3000/v1/users/' + id, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
  });

  expect(response.status).toBe(200);
});

test('Update a non valid user via API', async () => {
  let id = await get_id();
  let body = {
    username: null,
    name: undefined,
    surname: "dalla costa",
    email: "andrea@test.me"
   };

  let response = await fetch('http://localhost:3000/v1/users/' + id, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
  });

  expect(response.status).toBe(404);
});
