let results_logic = require('../logic/results_logic');
let fetch = require('node-fetch');

/* API calls test */
let api;
beforeAll(() => {
    api = require('../api');
});

afterAll(() => {
    api.close();
});

/* /results GET */
test('No params /results GET', async () => {
  let exam = undefined;
  let user = undefined;

  let response = await results_logic.getAllResults(exam, user);

  expect(response).toBeInstanceOf(Array);
  for (let i of response)
      expect(typeof i).toBe('number');
});
test('exam params /results GET', async () => {
  let exam = 4;
  let user = undefined;

  let response = await results_logic.getAllResults(exam, user);

  expect(response).toBeInstanceOf(Array);
  for (let i of response)
      expect(typeof i).toBe('number');
});
test('user params /results GET', async () => {
  let exam = undefined;
  let user = 2;

  let response = await results_logic.getAllResults(exam, user);

  expect(response).toBeInstanceOf(Array);
  for (let i of response)
      expect(typeof i).toBe('number');
});

test('All params /results GET', async () => {
  let exam = 4;
  let user = 2;

  let response = await results_logic.getAllResults(exam, user);

  expect(response).toBeInstanceOf(Array);
  for (let i of response)
      expect(typeof i).toBe('number');
});

// Wrong parameters → expecting Error
test('exam is string /results GET', () => {
  let exam = "exam_id";
  let user = undefined;

  expect(results_logic.getAllResults(exam, user)).rejects.toBeInstanceOf(Error);
});
test('user is string /results GET', () => {
  let exam = undefined;
  let user = "draane";

  expect(results_logic.getAllResults(exam, user)).rejects.toBeInstanceOf(Error);
});
test('exam is Object /results GET', () => {
  let exam = {};
  let user = undefined;

  expect(results_logic.getAllResults(exam, user)).rejects.toBeInstanceOf(Error);
});
test('user is Object /results GET', () => {
  let exam = undefined;
  let user = {};

  expect(results_logic.getAllResults(exam, user)).rejects.toBeInstanceOf(Error);
});
test('exam is Array /results GET', () => {
  let exam = [7];
  let user = undefined;

  expect(results_logic.getAllResults(exam, user)).rejects.toBeInstanceOf(Error);
});
test('user is Array /results GET', () => {
  let exam = undefined;
  let user = [7];

  expect(results_logic.getAllResults(exam, user)).rejects.toBeInstanceOf(Error);
});

/* results GET all */
test('Get all results via API', async () => {
    let exam = undefined;
    let user = undefined;

    let response = await fetch('http://localhost:3000/v1/results');

    let json = await response.json();

    expect(response.status).toBe(200);
    expect(json).toBeInstanceOf(Array);
    for (let i of json)
        expect(typeof i).toBe('number');
});
test('Get results with filters via API', async () => {
    let exam = 4;
    let user = 2;

    let response = await fetch('http://localhost:3000/v1/results?exam=' + exam + '&user=' + user);

    let json = await response.json();

    expect(response.status).toBe(200);
    expect(json).toBeInstanceOf(Array);
    for (let i of json)
        expect(typeof i).toBe('number');
});
