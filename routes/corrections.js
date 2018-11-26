var express = require('express');
var router = express.Router();

let corrections_logic = require('../logic/corrections_logic');

router.get('/corrections', (req, res) => {

    corrections_logic.getAllCorrections()
        .then(data => res.json(data))
        .catch(e => {
            res.status(400).send(e.message);
            console.error(e.stack);
        });

});

router.post('/corrections', (req, res) => {

    let correction = req.body.Correction;

    corrections_logic.insertACorrection(correction)
        .then(data => res.json(data))
        .catch(e => {
            res.status(400).send(e.message);
            console.error(e.stack);
        });

});


module.exports = router;