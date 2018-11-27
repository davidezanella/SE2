let corrections_logic = require('../logic/corrections_logic');
let fetch = require ('node-fetch');

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
    let correction = {
        answer_id: 124,
        text: "t",
        score: 1,
        user_id: 1
    };

    try {
        const data = await corrections_logic.insertACorrection(correction);
        expect(typeof data).toBe('number');
    }
    catch (e) {
        expect(e.detail).toBe("Key (answer_id, user_id)=(124, 1) already exists.");
    }
});



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


/*API calls test */

let api;
beforeAll(() => {
    api = require('../api');
});

afterAll(() => {
    api.close();
});


test("Insert valid correction via API", async () => {
    let correction = {
        answer_id: 124,
        text: "t",
        score: 1,
        user_id: 1
    };

    let body = { Correction: correction};

    let response = await fetch ('http://localhost:3000/v1/corrections', {
        method: 'post',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },    
    });

    let text = await response.text();

    if (response.status === 400)
        expect(text).toContain("duplicate key value violates unique constraint");
    else if (response.status === 201)
        expect(typeof text).toBe('number');
    

});

test("Get all corrections via API", async () => {
    let answer_id=124;
    let user_id=1;

    let response = await fetch('http://localhost:3000/v1/corrections?answer_id=' + answer_id + '&user_id=' + user_id);
    
    let json = await response.json();

    if (response.status === 200) {
        expect(json).toBeInstanceOf(Array);
        for (let i of json)
            expect(typeof i).toBe('number');
}
});