var express = require('express');
var router = express.Router();

let corrections_logic = require('../logic/corrections_logic');

router.get('/corrections', (req, res) => {
    let answer_id = req.query.answer_id;
    let user_id = req.query.user_id;
    corrections_logic.getAllCorrections(answer_id, user_id)
        .then(data => res.json(data))
        .catch(e => {
            res.status(404).send(e.message);
            console.error(e.stack);
        });

});

router.post('/corrections', (req, res) => {

    let correction = req.body.Correction;

    corrections_logic.insertACorrection(correction)
        .then(data => res.status(201).json(data))
        .catch(e => {
            res.status(400).send(e.message);
            console.error(e.stack);
        });

});


module.exports = router;