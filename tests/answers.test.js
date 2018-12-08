let answers_logic = require('../logic/answers_logic');
let users_logic = require('../logic/users_logic');
let tasks_logic = require('../logic/tasks_logic');
let fetch = require('node-fetch');

/* Answer POST */
test('Undefined answer', () => {
    let answer = undefined;

    expect(answers_logic.insertAnAnswer(answer)).rejects.toBeInstanceOf(Error);
});
test('String answer', () => {
    let answer = "a";

    expect(answers_logic.insertAnAnswer(answer)).rejects.toBeInstanceOf(Error);
});
test('Array answer', () => {
    let answer = ["a"];

    expect(answers_logic.insertAnAnswer(answer)).rejects.toBeInstanceOf(Error);
});

test('Undefined user_id', () => {
    let answer = {
        user_id: undefined,
        task_id: 1,
        answers: [""]
    };

    expect(answers_logic.insertAnAnswer(answer)).rejects.toBeInstanceOf(Error);
});
test('String user_id', () => {
    let answer = {
        user_id: "a",
        task_id: 1,
        answers: [""]
    };

    expect(answers_logic.insertAnAnswer(answer)).rejects.toBeInstanceOf(Error);
});
test('Object user_id', () => {
    let answer = {
        user_id: {},
        task_id: 1,
        answers: [""]
    };

    expect(answers_logic.insertAnAnswer(answer)).rejects.toBeInstanceOf(Error);
});

test('Undefined task_id', () => {
    let answer = {
        user_id: 1,
        task_id: undefined,
        answers: [""]
    };

    expect(answers_logic.insertAnAnswer(answer)).rejects.toBeInstanceOf(Error);
});
test('String task_id', () => {
    let answer = {
        user_id: 1,
        task_id: "a",
        answers: [""]
    };

    expect(answers_logic.insertAnAnswer(answer)).rejects.toBeInstanceOf(Error);
});
test('Object task_id', () => {
    let answer = {
        user_id: 1,
        task_id: {},
        answers: [""]
    };

    expect(answers_logic.insertAnAnswer(answer)).rejects.toBeInstanceOf(Error);
});

test('Undefined answers array', () => {
    let answer = {
        user_id: 1,
        task_id: 1,
        answers: undefined
    };

    expect(answers_logic.insertAnAnswer(answer)).rejects.toBeInstanceOf(Error);
});
test('String answers array', () => {
    let answer = {
        user_id: 1,
        task_id: 1,
        answers: ""
    };

    expect(answers_logic.insertAnAnswer(answer)).rejects.toBeInstanceOf(Error);
});
test('Object answers array', () => {
    let answer = {
        user_id: 1,
        task_id: 1,
        answers: {}
    };

    expect(answers_logic.insertAnAnswer(answer)).rejects.toBeInstanceOf(Error);
});
test('Integer array of answers', () => {
    let answer = {
        user_id: 1,
        task_id: 1,
        answers: [1, 2]
    };

    expect(answers_logic.insertAnAnswer(answer)).rejects.toBeInstanceOf(Error);
});
test('Undefined array of answers', () => {
    let answer = {
        user_id: 1,
        task_id: 1,
        answers: [undefined]
    };

    expect(answers_logic.insertAnAnswer(answer)).rejects.toBeInstanceOf(Error);
});
test('Empty array of answers', () => {
    let answer = {
        user_id: 1,
        task_id: 1,
        answers: []
    };

    expect(answers_logic.insertAnAnswer(answer)).rejects.toBeInstanceOf(Error);
});

test('Insert a valid answer', async () => {
    jest.setTimeout(30000);
    let user_id = await users_logic.createNewUser("test_username", "test_name", "test_surname", "test.email@test.com");

    let task_id = await tasks_logic.insertTask({
        task_title: "",
        author_id: user_id,
        question: "",
        task_type: "open_answer",
        choices: ["risp1", "risp2", "risp3"],
        correct_answer: ["risp1"]
    });

    let answer = {
        user_id: user_id,
        task_id: task_id,
        answers: ['a', 'c']
    };

    let data = await answers_logic.insertAnAnswer(answer);
    
    expect(typeof data).toBe('number');

    await answers_logic.deleteAnAnswer(data);
    await tasks_logic.deleteATask(task_id);
    await users_logic.deleteUser(user_id);
});


/* Answers GET all */

test('Undefined user_id', async () => {
    let user_id = undefined;
    let task_id = 1;
    let type = 'single_choice';

    let res = await answers_logic.getAllAnswers(user_id, task_id, type);
    expect(res).toBeInstanceOf(Array);
    for (let i of res)
        expect(typeof i).toBe('number');
});
test('String user_id', () => {
    let user_id = "a";
    let task_id = 1;
    let type = 'single_choice';

    expect(answers_logic.getAllAnswers(user_id, task_id, type)).rejects.toBeInstanceOf(Error);
});
test('Object user_id', () => {
    let user_id = {};
    let task_id = 1;
    let type = 'single_choice';

    expect(answers_logic.getAllAnswers(user_id, task_id, type)).rejects.toBeInstanceOf(Error);
});

test('Undefined task_id', async () => {
    let user_id = 1;
    let task_id = undefined;
    let type = 'single_choice';

    let res = await answers_logic.getAllAnswers(user_id, task_id, type);
    expect(res).toBeInstanceOf(Array);
    for (let i of res)
        expect(typeof i).toBe('number');
});
test('String task_id', () => {
    let user_id = 1;
    let task_id = "a";
    let type = 'single_choice';

    expect(answers_logic.getAllAnswers(user_id, task_id, type)).rejects.toBeInstanceOf(Error);
});
test('Object task_id', () => {
    let user_id = 1;
    let task_id = {};
    let type = 'single_choice';

    expect(answers_logic.getAllAnswers(user_id, task_id, type)).rejects.toBeInstanceOf(Error);
});

test('Undefined type', async () => {
    let user_id = 1;
    let task_id = 1;
    let type = undefined;

    let res = await answers_logic.getAllAnswers(user_id, task_id, type);
    expect(res).toBeInstanceOf(Array);
    for (let i of res)
        expect(typeof i).toBe('number');
});
test('Object type', () => {
    let user_id = 1;
    let task_id = 1;
    let type = {};

    expect(answers_logic.getAllAnswers(user_id, task_id, type)).rejects.toBeInstanceOf(Error);
});
test('Wrong type', () => {
    let user_id = 1;
    let task_id = 1;
    let type = 'aaa';

    expect(answers_logic.getAllAnswers(user_id, task_id, type)).rejects.toBeInstanceOf(Error);
});

test('Correct type parameters', async () => {
    let user_id = 1;
    let task_id = 1;
    let type = 'single_choice';

    let res = await answers_logic.getAllAnswers(user_id, task_id, type);
    expect(res).toBeInstanceOf(Array);
    for (let i of res)
        expect(typeof i).toBe('number');
});


/* Answers DELETE */

test('Undefined answer_id', () => {
    let answer_id = undefined;

    expect(answers_logic.deleteAnAnswer(answer_id)).rejects.toBeInstanceOf(Error);
});
test('String answer_id', () => {
    let answer_id = "a";

    expect(answers_logic.deleteAnAnswer(answer_id)).rejects.toBeInstanceOf(Error);
});
test('Object answer_id', () => {
    let answer_id = {};

    expect(answers_logic.deleteAnAnswer(answer_id)).rejects.toBeInstanceOf(Error);
});


/* Answer GET */

test('Undefined answer_id', () => {
    let answer_id = undefined;

    expect(answers_logic.getAnAnswer(answer_id)).rejects.toBeInstanceOf(Error);
});
test('String answer_id', () => {
    let answer_id = "a";

    expect(answers_logic.getAnAnswer(answer_id)).rejects.toBeInstanceOf(Error);
});
test('Object answer_id', () => {
    let answer_id = {};

    expect(answers_logic.getAnAnswer(answer_id)).rejects.toBeInstanceOf(Error);
});


/* API calls test */
let api;
beforeAll(() => {
    api = require('../api');
});

afterAll(() => {
    api.close();
});

/* Answer POST */
async function insertAnswer(answer) {
    let response = await fetch('http://localhost:3000/v1/answers', {
        method: 'post',
        body: JSON.stringify(answer),
        headers: { 'Content-Type': 'application/json' },
    });

    let id = await response.text();

    return id;
}

/* Answer DELETE */
async function deleteAnswer(answer_id) {
    await fetch('http://localhost:3000/v1/answers/' + answer_id, {
        method: 'delete'
    });
}

/* Answers GET all */
async function getAllAnswers(user_id, task_id, type) {
    let response = await fetch('http://localhost:3000/v1/answers');

    let json = await response.json();
    return json;
}

/* Answer GET */
async function getAnAnswer(answer_id) {
    let response = await fetch('http://localhost:3000/v1/answers/' + answer_id);

    let json = await response.json();
    return json;
}

test('Insert a valid answer via API and DELETE', async () => {
    jest.setTimeout(30000);
    let user_id = await users_logic.createNewUser("test_username", "test_name", "test_surname", "test.email@test.com");

    let task_id = await tasks_logic.insertTask({
        task_title: "",
        author_id: user_id,
        question: "",
        task_type: "open_answer",
        choices: ["risp1", "risp2", "risp3"],
        correct_answer: ["risp1"]
    });

    let body = {
        user_id: user_id,
        task_id: task_id,
        answers: ['a', 'c']
    };

    let id = await insertAnswer(body);

    await deleteAnswer(id);
    
    await tasks_logic.deleteATask(task_id);
    await users_logic.deleteUser(user_id);
});

test('Get all answers via API', async () => {
    jest.setTimeout(30000);

    let json = await getAllAnswers();

    expect(json).toBeInstanceOf(Array);
    for (let i of json) {
        expect(typeof i).toBe('number');

        let answer = await getAnAnswer(i);

        expect(typeof answer.id).toBe('number');
        expect(typeof answer.user_id).toBe('number');
        expect(typeof answer.task_id).toBe('number');
        expect(answer.answers).toBeInstanceOf(Array);
        for (let s of answer.answers) 
            expect(typeof s).toBe('string');
    }
});