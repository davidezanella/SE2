let users_logic = require('../logic/users_logic');
let fetch = require('node-fetch');

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

    let response = await fetch('http://localhost:3000/v1/answers?name=' + name + '&surname=' + surname + '&email=' + email);

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

    let response = await fetch('http://localhost:3000/v1/answers?name=' + name + '&surname=' + surname + '&email=' + email);

    let json = await response.json();

    expect(response.status).toBe(200);
    expect(json).toBeInstanceOf(Array);
    for (let i of json)
        expect(typeof i).toBe('number');
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
  
  expect(response.status).toBe(201);
  expect(!isNaN(text)).toBe(true);
});

test('Insert a NON valid user via API', async () => {
  let body = {
    username: null,
    name: "andrea",
    surname: "dalla costa",
    email: "andrea@test.me"
   };

  let response = await fetch('http://localhost:3000/v1/users', {
      method: 'post',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
  });

  expect(response.status).toBe(400);
});
