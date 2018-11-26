let corrections_logic = require('../logic/corrections_logic');


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
