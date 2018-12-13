var express = require('express');
var router = express.Router();

let results_logic = require('../logic/results_logic');

router.get('/results', (req, res) => {
  // Optionally apply filters by exam and user.
  let exam = req.query.exam_id;
  let user = req.query.user_id;

  results_logic.getAllResults(exam, user)
      .then(data => res.json(data))
      .catch(e => {
          res.status(404).send(e.message);
      });
});

module.exports = router;
