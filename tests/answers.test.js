let answers_logic = require('../logic/answers_logic');

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

test('Insert a valid answer', () => {
    let answer = {
        user_id: 1,
        task_id: 1,
        answers: ['a', 'c']
    };
    
    return answers_logic.insertAnAnswer(answer).then((data) => {
        expect(typeof data).toBe('number');
    }).catch ((e) => {
        expect(e.detail).toBe("Key (user_id, task_id)=(1, 1) already exists.");
    });
});