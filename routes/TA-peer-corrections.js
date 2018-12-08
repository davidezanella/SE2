var express = require('express');
var router = express.Router();

let taPeerCorrections_logic = require('../logic/TA-peer-corrections_logic');

router.get('/ta-peer-corrections/:ta_peer_correction_id', (req, res) => {
    let ta_peer_correction_id = req.params.ta_peer_correction_id;
    taPeerCorrections_logic.getTaPeerCorrectionById(ta_peer_correction_id)
    .then(data => res.json(data))
    .catch(e => {
        res.status(404).send(e.message);
    });
    
});

router.put('/ta-peer-corrections/:ta_peer_correction_id', (req, res) => {
    
    let ta_peer_correction_id = req.params.ta_peer_correction_id;
    let TaPeerCorrectionObject = req.body['TA-peer-correction'];

    TaPeerCorrectionObject['id'] = ta_peer_correction_id;
    taPeerCorrections_logic.updateTaPeerCorrection(TaPeerCorrectionObject)
    .then(data => res.json(data))
    .catch(e => {
        res.status(404).send(e.message);
    });
    
});


module.exports = router;
