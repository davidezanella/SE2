let answers_logic = require('../logic/answers_logic');
let fetch = require('node-fetch');

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

test('Insert a valid answer', async (done) => {
    let answer = {
        user_id: 1,
        task_id: 1,
        answers: ['a', 'c']
    };

    let data;
    let exception = false;
    try {
        data = await answers_logic.insertAnAnswer(answer);
    }
    catch (e) {
        exception = true;
        expect(e.detail).toBe("Key (user_id, task_id)=(1, 1) already exists.");
    }

    if (exception && data === undefined)
        done();
    else
        expect(typeof data).toBe('number');
    done();
});



/* API calls test */

require('../api');

test('Insert a valid answer via API', (done) => {
    let answer = {
        user_id: 1,
        task_id: 1,
        answers: ['a', 'c']
    };

    let body = { Answer: answer };

    let status;
    fetch('http://localhost:3000/v1/answers', {
        method: 'post',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    })
        .then(res => {
            status = res.status;
            return res.text();
        })
        .then(text => {
            if(status === 400)
                expect(text).toContain("duplicate key value violates unique constraint");
            else if (status === 201) 
                expect(typeof text).toBe('number');
            done();
        });
});