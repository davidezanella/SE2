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

        });

});

router.get('/corrections/:id', (req, res) => {
    let correction_id = req.params.id;

    corrections_logic.getACorrection(correction_id)
        .then(data => res.json(data))
        .catch(e => {
            res.status(404).send(e.message);

        })
});

router.post('/corrections', (req, res) => {

    let correction = req.body.Correction;

    corrections_logic.insertACorrection(correction)
        .then(data => res.status(201).json(data))
        .catch(e => {
            res.status(400).send(e.message);

        });

});

router.delete('/corrections/:id', (req, res) => {
    let correction_id = req.params.id;

    corrections_logic.deleteACorrection(correction_id)
        .then(data => res.sendStatus(204))
        .catch(e => {
            res.status(404).send(e.message);
        });
});

module.exports = router;