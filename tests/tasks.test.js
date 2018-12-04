let tasks_logic = require ("../logic/tasks_logic");

test("Undefined title",() => {
    let task = {
        task_title: undefined,
        author_id: 1,
        question: "",
        task_type: "open_answer",
        choices: ["risp1","risp2","risp3"],
        correct_answer: ["risp1"]
    };
    expect(tasks_logic.insertTask(task))
    .rejects.toBeInstanceOf(Error);
});

test("Object title", () => {
    let task = {
        task_title: {},
        author_id: 1,
        question: "",
        task_type: "open_answer",
        choices: ["risp1","risp2","risp3"],
        correct_answer: ["risp1"]
    };
    expect(tasks_logic.insertTask(task)).rejects.toBeInstanceOf(Error);
});

test("Array title", () => {
    let task = {
        task_title: [],
        author_id: 1,
        question: "",
        task_type: "open_answer",
        choices: ["risp1","risp2","risp3"],
        correct_answer: ["risp1"]
    };
    expect(tasks_logic.insertTask(task)).rejects.toBeInstanceOf(Error);
});

test("Undefined author id", () => {
    let task = {
        task_title : "",
        author_id : undefined,
        question: "",
        task_type: "open_answer",
        choices: ["risp1","risp2","risp3"],
        correct_answer: ["risp1"]
    };
    expect(tasks_logic.insertTask(task)).rejects.toBeInstanceOf(Error);
});

test("Array author id", () => {
    let task = {
        task_title : "",
        author_id : [],
        question: "",
        task_type: "open_answer",
        choices: ["risp1","risp2","risp3"],
        correct_answer: ["risp1"]
    };
    expect(tasks_logic.insertTask(task)).rejects.toBeInstanceOf(Error);
});

test("Object author id", () => {
    let task = {
        task_title : "",
        author_id : {},
        question: "",
        task_type: "open_answer",
        choices: ["risp1","risp2","risp3"],
        correct_answer: ["risp1"]
    };
    expect(tasks_logic.insertTask(task)).rejects.toBeInstanceOf(Error);
});

test("Undefined question", () => {
    let task = {
        task_title : "",
        author_id : 1,
        question: undefined,
        task_type: "open_answer",
        choices: ["risp1","risp2","risp3"],
        correct_answer: ["risp1"]
    };
    expect(tasks_logic.insertTask(task)).rejects.toBeInstanceOf(Error);
});

test("Object question", () => {
    let task = {
        task_title : "",
        author_id : 1,
        question : {},
        task_type: "open_answer",
        choices: ["risp1","risp2","risp3"],
        correct_answer: ["risp1"]
    };
    expect(tasks_logic.insertTask(task)).rejects.toBeInstanceOf(Error);
});

test("Array question", () => {
    let task = {
        task_title: "task",
        author_id: 1,
        question: [],
        task_type: "open_answer",
        choices: ["risp1","risp2","risp3"],
        correct_answer: ["risp1"]
    };
    expect(tasks_logic.insertTask(task)).rejects.toBeInstanceOf(Error);
});

test("Undefined task type", () => {
    let task = {
        task_title : "",
        author_id : 1,
        question: "",
        task_type: undefined,
        choices: ["risp1","risp2","risp3"],
        correct_answer: ["risp1"]
    };
    expect(tasks_logic.insertTask(task)).rejects.toBeInstanceOf(Error);
});

test("Array task type", () => {
    let task = {
        task_title : "",
        author_id : 1,
        question: "",
        task_type: [],
        choices: ["risp1","risp2","risp3"],
        correct_answer: ["risp1"]
    };
    expect(tasks_logic.insertTask(task)).rejects.toBeInstanceOf(Error);
});

test("Object task type", () => {
    let task = {
        task_title : "",
        author_id : 1,
        question: "",
        task_type: {},
        choices: ["risp1","risp2","risp3"],
        correct_answer: ["risp1"]
    };
    expect(tasks_logic.insertTask(task)).rejects.toBeInstanceOf(Error);
});

test("Undefined task",()=> {
    let task = undefined;
    expect(tasks_logic.insertTask(task)).rejects.toBeInstanceOf(Error);
});

test("Array task", () => {
    let task = [];
    expect(tasks_logic.insertTask(task)).rejects.toBeInstanceOf(Error);
});

test("String task", () => {
    let task = "task";
    expect(tasks_logic.insertTask(task)).rejects.toBeInstanceOf(Error);
});

test("Valid task", () => {
    let task = {
        id : 3,
        task_title : "",
        author_id : 1,
        question: "",
        task_type: "open_answer",
        choices: ["risp1","risp2","risp3"],
        correct_answer: ["risp1"]
    };
    return tasks_logic.insertTask(task).then((data) => {
        expect(typeof data).toBe("number"); });
});

// Check choices
test("Undefined choices",() => {
    let task = {
        task_title: "",
        author_id: 1,
        question: "",
        task_type: "open_answer",
        choices: undefined,
        correct_answer: ["risp1"]
    };
    expect(tasks_logic.insertTask(task))
    .rejects.toBeInstanceOf(Error);
});

test("Object choices", () => {
    let task = {
        task_title: "",
        author_id: 1,
        question: "",
        task_type: "open_answer",
        choices: {},
        correct_answer: ["risp1"]
    };
    expect(tasks_logic.insertTask(task)).rejects.toBeInstanceOf(Error);
});

// Check correct answers
test("Undefined correct answers",() => {
    let task = {
        task_title: "",
        author_id: 1,
        question: "",
        task_type: "open_answer",
        choices: ["risp1","risp2","risp3"],
        correct_answer: undefined
    };
    expect(tasks_logic.insertTask(task))
    .rejects.toBeInstanceOf(Error);
});

test("Object choices", () => {
    let task = {
        task_title: "",
        author_id: 1,
        question: "",
        task_type: "open_answer",
        choices: ["risp1","risp2","risp3"],
        correct_answer: {}
    };
    expect(tasks_logic.insertTask(task)).rejects.toBeInstanceOf(Error);
});

// API test