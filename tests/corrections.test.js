let corrections_logic = require('../logic/corrections_logic');
let users_logic = require('../logic/users_logic');
let tasks_logic = require('../logic/tasks_logic');
let answers_logic = require('../logic/answers_logic');
let fetch = require('node-fetch');

/*insert a correction */
test("Undefined correction", () => {
    let correction = undefined;
    expect(corrections_logic.insertACorrection(correction)).rejects.toBeInstanceOf(Error);
});

test("String correction", () => {
    let correction = "c";
    expect(corrections_logic.insertACorrection(correction)).rejects.toBeInstanceOf(Error);

});

test("Array correction", () => {
    let correction = ["c"];
    expect(corrections_logic.insertACorrection(correction)).rejects.toBeInstanceOf(Error);

});



test("Undefined answer_id", () => {
    let correction = {
        answer_id: undefined,
        text: "t",
        score: 1,
        user_id: 2
    };

    expect(corrections_logic.insertACorrection(correction)).rejects.toBeInstanceOf(Error);

});

test("Object answer_id", () => {
    let correction = {
        answer_id: {},
        text: "t",
        score: 1,
        user_id: 2
    };

    expect(corrections_logic.insertACorrection(correction)).rejects.toBeInstanceOf(Error);

});

test("String answer_id", () => {
    let correction = {
        answer_id: "a",
        text: "t",
        score: 1,
        user_id: 2
    };

    expect(corrections_logic.insertACorrection(correction)).rejects.toBeInstanceOf(Error);

});

test("Undefined text", () => {
    let correction = {
        answer_id: 1,
        text: undefined,
        score: 1,
        user_id: 2
    };

    expect(corrections_logic.insertACorrection(correction)).rejects.toBeInstanceOf(Error);

});

test("Number text", () => {
    let correction = {
        answer_id: 1,
        text: 4,
        score: 1,
        user_id: 2
    };

    expect(corrections_logic.insertACorrection(correction)).rejects.toBeInstanceOf(Error);

});

test("Object text", () => {
    let correction = {
        answer_id: 1,
        text: {},
        score: 1,
        user_id: 2
    };

    expect(corrections_logic.insertACorrection(correction)).rejects.toBeInstanceOf(Error);

});

test("Array text", () => {
    let correction = {
        answer_id: 1,
        text: ["a"],
        score: 1,
        user_id: 2
    };

    expect(corrections_logic.insertACorrection(correction)).rejects.toBeInstanceOf(Error);

});

test("Undefined score", () => {
    let correction = {
        answer_id: 1,
        text: "t",
        score: undefined,
        user_id: 2
    };

    expect(corrections_logic.insertACorrection(correction)).rejects.toBeInstanceOf(Error);

});

test("String score", () => {
    let correction = {
        answer_id: 1,
        text: "t",
        score: "s",
        user_id: 2
    };

    expect(corrections_logic.insertACorrection(correction)).rejects.toBeInstanceOf(Error);

});

test("Object score", () => {
    let correction = {
        answer_id: 1,
        text: "t",
        score: {},
        user_id: 2
    };

    expect(corrections_logic.insertACorrection(correction)).rejects.toBeInstanceOf(Error);

});

test("Undefined user_id", () => {
    let correction = {
        answer_id: 1,
        text: "t",
        score: 1,
        user_id: undefined
    };

    expect(corrections_logic.insertACorrection(correction)).rejects.toBeInstanceOf(Error);

});

test("String user_id", () => {
    let correction = {
        answer_id: 1,
        text: "t",
        score: 1,
        user_id: "u"
    };

    expect(corrections_logic.insertACorrection(correction)).rejects.toBeInstanceOf(Error);

});

test("Object user_id", () => {
    let correction = {
        answer_id: 1,
        text: "t",
        score: 1,
        user_id: {}
    };

    expect(corrections_logic.insertACorrection(correction)).rejects.toBeInstanceOf(Error);

});

test("Insert a valid correction", async () => {
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

    let answer_id = await answers_logic.insertAnAnswer(answer);

    let correction = {
        answer_id: answer_id,
        text: "t",
        score: 1,
        user_id: 1
    };

    const data = await corrections_logic.insertACorrection(correction);
    expect(typeof data).toBe('number');

    await corrections_logic.deleteACorrection(data);
    await answers_logic.deleteAnAnswer(answer_id);
    await tasks_logic.deleteATask(task_id);
    await users_logic.deleteUser(user_id);
});


/* get all corrections */
test("Object answer_id in the filter", () => {
    let answer_id = {};
    let user_id = 1;
    expect(corrections_logic.getAllCorrections(answer_id, user_id)).rejects.toBeInstanceOf(Error);

});

test("String answer_id in the filter", () => {
    let answer_id = "a";
    let user_id = 1;
    expect(corrections_logic.getAllCorrections(answer_id, user_id)).rejects.toBeInstanceOf(Error);

});

test("Array answer_id in the filter", () => {
    let answer_id = [2];
    let user_id = 1;
    expect(corrections_logic.getAllCorrections(answer_id, user_id)).rejects.toBeInstanceOf(Error);

});

test("Object user_id in the filter", () => {
    let answer_id = 1;
    let user_id = {};
    expect(corrections_logic.getAllCorrections(answer_id, user_id)).rejects.toBeInstanceOf(Error);

});

test("String user_id in the filter", () => {
    let answer_id = 1;
    let user_id = "u";
    expect(corrections_logic.getAllCorrections(answer_id, user_id)).rejects.toBeInstanceOf(Error);

});

test("Array user_id in the filter", () => {
    let answer_id = 1;
    let user_id = [2];
    expect(corrections_logic.getAllCorrections(answer_id, user_id)).rejects.toBeInstanceOf(Error);

});

test("Insert valid filters", async () => {
    let answer_id = 1;
    let user_id = 2;
    const data = await corrections_logic.getAllCorrections(answer_id, user_id);
    expect(data).toBeInstanceOf(Array);
    for (var i = 0; i < data.length; i++) {
        expect(typeof data[i]).toBe('number');
    }

});

/*delete a correction */
test("Undefined correction_id", () => {
    let correction_id = undefined;
    expect(corrections_logic.deleteACorrection(correction_id)).rejects.toBeInstanceOf(Error);

});

test("String correction_id", () => {
    let correction_id = "c";
    expect(corrections_logic.deleteACorrection(correction_id)).rejects.toBeInstanceOf(Error);

});

test("Object correction_id", () => {
    let correction_id = {};
    expect(corrections_logic.deleteACorrection(correction_id)).rejects.toBeInstanceOf(Error);

});

test("Array correction_id", () => {
    let correction_id = [2];
    expect(corrections_logic.deleteACorrection(correction_id)).rejects.toBeInstanceOf(Error);

});

/* get a correction */
test("Undefined correction_id", () => {
    let correction_id = undefined;
    expect(corrections_logic.getACorrection(correction_id)).rejects.toBeInstanceOf(Error);

});

test("String correction_id", () => {
    let correction_id = "c";
    expect(corrections_logic.getACorrection(correction_id)).rejects.toBeInstanceOf(Error);

});

test("Object correction_id", () => {
    let correction_id = {};
    expect(corrections_logic.getACorrection(correction_id)).rejects.toBeInstanceOf(Error);

});

test("Array correction_id", () => {
    let correction_id = [2];
    expect(corrections_logic.getACorrection(correction_id)).rejects.toBeInstanceOf(Error);

});

/*API calls test */

let api;
beforeAll(() => {
    api = require('../api');
});

afterAll(() => {
    api.close();
});


async function getAllCorrections(answer_id, user_id) {
    let getAll_result = await fetch('http://localhost:3000/v1/corrections', {
        method: 'get',
        headers: {
            'Accept': 'application/json'
        }
    });
    let getAll_json = await getAll_result.json();
    return getAll_json;
};

async function getACorrection(correction_id) {
    let result = await fetch('http://localhost:3000/v1/corrections/' + correction_id, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (result.status === 200) {
        let json = await result.json();
        return json;
    }
    else if (result.status === 404) {
        return null;
    }
};

async function insertACorrection(correction) {

    let result = await fetch('http://localhost:3000/v1/corrections', {
        method: 'post',
        body: JSON.stringify(correction),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    let correction_id = await result.text();
    return correction_id;

};

async function deleteACorrection(correction_id) {
    await fetch('http://localhost:3000/v1/corrections/' + correction_id, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
};

test("Insert a correction via API and delete", async () => {
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

    let answer_id = await answers_logic.insertAnAnswer(answer);

    let correction = {
        answer_id: answer_id,
        text: 't',
        score: 5,
        user_id: 1
    }

    //API calls
    let correction_id = await insertACorrection(correction);
    await deleteACorrection(correction_id);

    //db calls
    await answers_logic.deleteAnAnswer(answer_id);
    await tasks_logic.deleteATask(task_id);
    await users_logic.deleteUser(user_id);
});

test("Get all corrections via API", async () => {
    let json = await getAllCorrections();
    expect(json).toBeInstanceOf(Array);
    for (let i of json) {
        expect(typeof i).toBe('number');
    }

    if (json.length > 0) {
        let res = await getACorrection(json[0]);
        expect(typeof res).toBe('object');
        expect(typeof res.id).toBe('number');
        expect(typeof res.answer_id).toBe('number');
        expect(typeof res.text).toBe('string');
        expect(typeof res.score).toBe('number');
        expect(typeof res.user_id).toBe('number');
    }
});

test("Get an inexistent correction via API", async () => {
    let correction_id = 1;
    let res = await getACorrection(correction_id);
    expect(res).toBe(null);

})