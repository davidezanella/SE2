let taPeerCorrections = require('../logic/TA-peer-corrections_logic');
let fetch = require('node-fetch');
const isNumber = require('is-number');

// GET test for TA peer correction

/*  
    FAILED ONES
*/
test('Undefined ta peer correction id', () => {
    let ta_peer_correction_id = undefined;
    expect(taPeerCorrections.getTaPeerCorrectionById(ta_peer_correction_id)).rejects.toBeInstanceOf(Error);
});
test('null ta peer correction id', () => {
    let ta_peer_correction_id = null;
    expect(taPeerCorrections.getTaPeerCorrectionById(ta_peer_correction_id)).rejects.toBeInstanceOf(Error);
});
test('string ta peer correction id', () => {
    let ta_peer_correction_id = "a";
    expect(taPeerCorrections.getTaPeerCorrectionById(ta_peer_correction_id)).rejects.toBeInstanceOf(Error);
});
test('list ta peer correction id', () => {
    let ta_peer_correction_id = [1];
    expect(taPeerCorrections.getTaPeerCorrectionById(ta_peer_correction_id)).rejects.toBeInstanceOf(Error);
});
test('object ta peer correction id', () => {
    let ta_peer_correction_id = {"a": 1};
    expect(taPeerCorrections.getTaPeerCorrectionById(ta_peer_correction_id)).rejects.toBeInstanceOf(Error);
});
test('negative ta peer correction id', () => {
    let ta_peer_correction_id = -1;
    expect(taPeerCorrections.getTaPeerCorrectionById(ta_peer_correction_id)).rejects.toBeInstanceOf(Error);
});
test('Infinity ta peer correction id', () => {
    let ta_peer_correction_id = Infinity;
    expect(taPeerCorrections.getTaPeerCorrectionById(ta_peer_correction_id)).rejects.toBeInstanceOf(Error);
});
test('Infinity ta peer correction id', () => {
    let ta_peer_correction_id = -Infinity;
    expect(taPeerCorrections.getTaPeerCorrectionById(ta_peer_correction_id)).rejects.toBeInstanceOf(Error);
});
test('NaN ta peer correction id', () => {
    let ta_peer_correction_id = NaN;
    expect(taPeerCorrections.getTaPeerCorrectionById(ta_peer_correction_id)).rejects.toBeInstanceOf(Error);
});
test('Empty String ta peer correction id', () => {
    let ta_peer_correction_id = '';
    expect(taPeerCorrections.getTaPeerCorrectionById(ta_peer_correction_id)).rejects.toBeInstanceOf(Error);
});
test('Empty list ta peer correction id', () => {
    let ta_peer_correction_id = [];
    expect(taPeerCorrections.getTaPeerCorrectionById(ta_peer_correction_id)).rejects.toBeInstanceOf(Error);
});
test('function ta peer correction id', () => {
    let ta_peer_correction_id = function(){};
    expect(taPeerCorrections.getTaPeerCorrectionById(ta_peer_correction_id)).rejects.toBeInstanceOf(Error);
});


/* Valid ta peer correction ID */
test('valid ta peer correction id', async () => {
    let ta_peer_correction_id = 1;
    let data;
    let exception = false;
    try {
        data = await taPeerCorrections.getTaPeerCorrectionById(ta_peer_correction_id);
    }
    catch (e) {
        exception = true;
        // Message for id doesn't exist.
        //expect(e.detail).toBe("");
    }
    //console.log(data);
    /*
        expect(isNumber(data['id'])).toBe(true);
        expect(isNumber(data['peer_correction_id'])).toBe(true);
        expect(isNumber(data['answer_id'])).toBe(true);
        expect(typeof data['text']).toBe('string');
        expect(isNumber(data['user_id'])).toBe(true);

        id, peer_correction_id, answer_id, text, user_id
    */
    expect(typeof data).toBe('object');
});


// #####################################################
// PUT to update TA peer correction
// #####################################################

test('null as Ta peer correction', () => {
    let TaPeerCorrection = null;
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});
test('undefined as Ta peer correction', () => {
    let TaPeerCorrection = undefined;
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});
test('empty string as Ta peer correction', () => {
    let TaPeerCorrection = "";
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});
test('string as Ta peer correction', () => {
    let TaPeerCorrection = "abc";
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});
test('NaN as Ta peer correction', () => {
    let TaPeerCorrection = NaN;
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});
test('Infinity as Ta peer correction', () => {
    let TaPeerCorrection = Infinity;
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});
test('-Infinity as Ta peer correction', () => {
    let TaPeerCorrection = - Infinity;
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});
test('empty list as Ta peer correction', () => {
    let TaPeerCorrection = [];
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});
test('list as Ta peer correction', () => {
    let TaPeerCorrection = [1,2,3];
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});
test('{} as Ta peer correction', () => {
    let TaPeerCorrection = {};
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});

// Test Peer correction id to be valid
test('null Ta peer correction id in a non empty object', () => {
    let TaPeerCorrection = {
        'peer_correction_id': null,
        'answer_id': 1,
        'user_id': 1,
        'id': 1
    };
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});
test('undefined Ta peer correction id in a non empty object', () => {
    let TaPeerCorrection = {
        'peer_correction_id': undefined,
        'answer_id': 1,
        'user_id': 1,
        'id': 1
    };
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});
test('emty string as Ta peer correction id in a non empty object', () => {
    let TaPeerCorrection = {
        'peer_correction_id': "",
        'answer_id': 1,
        'user_id': 1,
        'id': 1
    };
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});
test('string Ta peer correction id in a non empty object', () => {
    let TaPeerCorrection = {
        'peer_correction_id': "1",
        'answer_id': 1,
        'user_id': 1,
        'id': 1
    };
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});
test('NaN Ta peer correction id in a non empty object', () => {
    let TaPeerCorrection = {
        'peer_correction_id': NaN,
        'answer_id': 1,
        'user_id': 1,
        'id': 1
    };
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});
test('Infinity Ta peer correction id in a non empty object', () => {
    let TaPeerCorrection = {
        'peer_correction_id': Infinity,
        'answer_id': 1,
        'user_id': 1,
        'id': 1
    };
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});
test('- infinity Ta peer correction id in a non empty object', () => {
    let TaPeerCorrection = {
        'peer_correction_id': -Infinity,
        'answer_id': 1,
        'user_id': 1,
        'id': 1
    };
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});
test(' empty list Ta peer correction id in a non empty object', () => {
    let TaPeerCorrection = {
        'peer_correction_id': [],
        'answer_id': 1,
        'user_id': 1,
        'id': 1
    };
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});
test('list Ta peer correction id in a non empty object', () => {
    let TaPeerCorrection = {
        'peer_correction_id': [1,2,3],
        'answer_id': 1,
        'user_id': 1,
        'id': 1
    };
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});
test('empty object Ta peer correction id in a non empty object', () => {
    let TaPeerCorrection = {
        'peer_correction_id': {},
        'answer_id': 1,
        'user_id': 1,
        'id': 1
    };
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});
test('object Ta peer correction id in a non empty object', () => {
    let TaPeerCorrection = {
        'peer_correction_id': {"a": 1},
        'answer_id': 1,
        'user_id': 1,
        'id': 1
    };
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});
test('negative Ta peer correction id in a non empty object', () => {
    let TaPeerCorrection = {
        'peer_correction_id': -1,
        'answer_id': 1,
        'user_id': 1,
        'id': 1
    };
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});
test('decimal Ta peer correction id in a non empty object', () => {
    let TaPeerCorrection = {
        'peer_correction_id': 0.1,
        'answer_id': 1,
        'user_id': 1,
        'id': 1
    };
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});
test('Absent Ta peer correction id in a non empty object', () => {
    let TaPeerCorrection = {
        'answer_id': 1,
        'user_id': 1,
        'id': 1
    };
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});

// Test answer id is valid
test('null answer id in a non empty object', () => {
    let TaPeerCorrection = {
        'peer_correction_id': 1,
        'answer_id': null,
        'user_id': 1,
        'id': 1
    };
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});
test('undefined answer id in a non empty object', () => {
    let TaPeerCorrection = {
        'peer_correction_id': 1,
        'answer_id': undefined,
        'user_id': 1,
        'id': 1
    };
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});
test('emty string as answer id in a non empty object', () => {
    let TaPeerCorrection = {
        'peer_correction_id': 1,
        'answer_id': "",
        'user_id': 1,
        'id': 1
    };
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});
test('string answer id in a non empty object', () => {
    let TaPeerCorrection = {
        'peer_correction_id': 1,
        'answer_id': "1",
        'user_id': 1,
        'id': 1
    };
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});
test('NaN answer id in a non empty object', () => {
    let TaPeerCorrection = {
        'peer_correction_id': 1,
        'answer_id': NaN,
        'user_id': 1,
        'id': 1
    };
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});
test('Infinity answer id in a non empty object', () => {
    let TaPeerCorrection = {
        'peer_correction_id': 1,
        'answer_id': Infinity,
        'user_id': 1,
        'id': 1
    };
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});
test('- infinity answer id in a non empty object', () => {
    let TaPeerCorrection = {
        'peer_correction_id': 1,
        'answer_id': -Infinity,
        'user_id': 1,
        'id': 1
    };
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});
test(' empty list answer id in a non empty object', () => {
    let TaPeerCorrection = {
        'peer_correction_id': 1,
        'answer_id': [],
        'user_id': 1,
        'id': 1
    };
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});
test('list answer id in a non empty object', () => {
    let TaPeerCorrection = {
        'peer_correction_id': 1,
        'answer_id': [1,2,3],
        'user_id': 1,
        'id': 1
    };
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});
test('empty object answer id in a non empty object', () => {
    let TaPeerCorrection = {
        'peer_correction_id': 1,
        'answer_id': {},
        'user_id': 1,
        'id': 1
    };
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});
test('object answer id in a non empty object', () => {
    let TaPeerCorrection = {
        'peer_correction_id': 1,
        'answer_id': {"a": 1},
        'user_id': 1,
        'id': 1
    };
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});
test('negative answer id in a non empty object', () => {
    let TaPeerCorrection = {
        'peer_correction_id': 1,
        'answer_id': -1,
        'user_id': 1,
        'id': 1
    };
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});
test('decimal answer id in a non empty object', () => {
    let TaPeerCorrection = {
        'peer_correction_id': 1,
        'answer_id': 0.1,
        'user_id': 1,
        'id': 1
    };
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});
test('Absent answer id in a non empty object', () => {
    let TaPeerCorrection = {
        'peer_correction_id': 1,
        'user_id': 1,
        'id': 1
    };
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});

// Test user id is valid
test('null user id in a non empty object', () => {
    let TaPeerCorrection = {
        'peer_correction_id': 1,
        'answer_id': 1,
        'user_id': null,
        'id': 1
    };
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});
test('undefined user id in a non empty object', () => {
    let TaPeerCorrection = {
        'peer_correction_id': 1,
        'answer_id': 1,
        'user_id': undefined,
        'id': 1
    };
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});
test('emty string as user id in a non empty object', () => {
    let TaPeerCorrection = {
        'peer_correction_id': 1,
        'answer_id': 1,
        'user_id': "",
        'id': 1
    };
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});
test('string user id in a non empty object', () => {
    let TaPeerCorrection = {
        'peer_correction_id': 1,
        'answer_id': 1,
        'user_id': "1",
        'id': 1
    };
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});
test('NaN user id in a non empty object', () => {
    let TaPeerCorrection = {
        'peer_correction_id': 1,
        'answer_id': 1,
        'user_id': NaN,
        'id': 1
    };
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});
test('Infinity user id in a non empty object', () => {
    let TaPeerCorrection = {
        'peer_correction_id': 1,
        'answer_id': 1,
        'user_id': Infinity,
        'id': 1
    };
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});
test('- infinity user id in a non empty object', () => {
    let TaPeerCorrection = {
        'peer_correction_id': 1,
        'answer_id': 1,
        'user_id': -Infinity,
        'id': 1
    };
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});
test(' empty list user id in a non empty object', () => {
    let TaPeerCorrection = {
        'peer_correction_id': 1,
        'answer_id': 1,
        'user_id': [],
        'id': 1
    };
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});
test('list user id in a non empty object', () => {
    let TaPeerCorrection = {
        'peer_correction_id': 1,
        'answer_id': 1,
        'user_id': [1,2,3],
        'id': 1
    };
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});
test('empty object user id in a non empty object', () => {
    let TaPeerCorrection = {
        'peer_correction_id': 1,
        'answer_id': 1,
        'user_id': {},
        'id': 1
    };
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});
test('object user id in a non empty object', () => {
    let TaPeerCorrection = {
        'peer_correction_id': 1,
        'answer_id': 1,
        'user_id': {"a": 1},
        'id': 1
    };
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});
test('negative user id in a non empty object', () => {
    let TaPeerCorrection = {
        'peer_correction_id': 1,
        'answer_id': 1,
        'user_id': -1,
        'id': 1
    };
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});
test('decimal answer id in a non empty object', () => {
    let TaPeerCorrection = {
        'peer_correction_id': 1,
        'answer_id': 1,
        'user_id': 0.1,
        'id': 1
    };
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});
test('Absent user id in a non empty object', () => {
    let TaPeerCorrection = {
        'peer_correction_id': 1,
        'answer_id': 1,
        'id': 1
    };
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});

// Test validity of ID

test('null id in a non empty object', () => {
    let TaPeerCorrection = {
        'peer_correction_id': 1,
        'answer_id': 1,
        'user_id': 1,
        'id': null
    };
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});
test('undefined id in a non empty object', () => {
    let TaPeerCorrection = {
        'peer_correction_id': 1,
        'answer_id': 1,
        'user_id': 1,
        'id': undefined
    };
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});
test('emty string as id in a non empty object', () => {
    let TaPeerCorrection = {
        'peer_correction_id': 1,
        'answer_id': 1,
        'user_id': 1,
        'id': ""
    };
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});
test('string id in a non empty object', () => {
    let TaPeerCorrection = {
        'peer_correction_id': 1,
        'answer_id': 1,
        'user_id': 1,
        'id': "1"
    };
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});
test('NaN id in a non empty object', () => {
    let TaPeerCorrection = {
        'peer_correction_id': 1,
        'answer_id': 1,
        'user_id': 1,
        'id': NaN
    };
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});
test('Infinity id in a non empty object', () => {
    let TaPeerCorrection = {
        'peer_correction_id': 1,
        'answer_id': 1,
        'user_id': 1,
        'id': Infinity
    };
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});
test('- infinity id in a non empty object', () => {
    let TaPeerCorrection = {
        'peer_correction_id': 1,
        'answer_id': 1,
        'user_id': 1,
        'id': -Infinity
    };
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});
test(' empty list id in a non empty object', () => {
    let TaPeerCorrection = {
        'peer_correction_id': 1,
        'answer_id': 1,
        'user_id': 1,
        'id': []
    };
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});
test('list id in a non empty object', () => {
    let TaPeerCorrection = {
        'peer_correction_id': 1,
        'answer_id': 1,
        'user_id': 1,
        'id': [1,2,3]
    };
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});
test('empty object id in a non empty object', () => {
    let TaPeerCorrection = {
        'peer_correction_id': 1,
        'answer_id': 1,
        'user_id': 1,
        'id': {}
    };
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});
test('object id in a non empty object', () => {
    let TaPeerCorrection = {
        'peer_correction_id': 1,
        'answer_id': 1,
        'user_id': 1,
        'id': {"a": 1}
    };
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});
test('negative id in a non empty object', () => {
    let TaPeerCorrection = {
        'peer_correction_id': 1,
        'answer_id': 1,
        'user_id': 1,
        'id': -1
    };
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});
test('decimal id in a non empty object', () => {
    let TaPeerCorrection = {
        'peer_correction_id': 1,
        'answer_id': 1,
        'user_id': 1,
        'id': 0.1
    };
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});
test('Absent id in a non empty object', () => {
    let TaPeerCorrection = {
        'peer_correction_id': 1,
        'answer_id': 1,
        'user_id': 1
    };
    expect(taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection)).rejects.toBeInstanceOf(Error);
});

// Test response to a valid request:
test('valid ta peer correction id', async () => {
    let TaPeerCorrection = {
        'peer_correction_id': 1,
        'answer_id': 1,
        'user_id': 1,
        'id': 1
    };
    let res;
    let exception = false;
    try {
        res = await taPeerCorrections.updateTaPeerCorrection(TaPeerCorrection);
    }
    catch (e) {
        exception = true;
        // Message for id doesn't exist.
        //expect(e.detail).toBe("");
    }

    expect(typeof res).toBe('number');
});