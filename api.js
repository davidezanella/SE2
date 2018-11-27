const express = require('express');
var bodyParser = require('body-parser');

var answers = require('./routes/answers');
var corrections = require('./routes/corrections');
var exams = require('./routes/exams');
var peerCorrections = require('./routes/peer-corrections');
var results = require('./routes/results');
var taPeerCorrections = require('./routes/TA-peer-corrections');
var tasks = require('./routes/tasks');
var users = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

let version = "v1";

app.get('/' + version, (req, res) => {
    res.send('Api running!')
});

app.use('/' + version, answers);
app.use('/' + version, corrections);
app.use('/' + version, exams);
app.use('/' + version, peerCorrections);
app.use('/' + version, results);
app.use('/' + version, taPeerCorrections);
app.use('/' + version, tasks);
app.use('/' + version, users);

let server = app.listen(PORT, () => console.log('Example app listening on port ' + PORT));



module.exports = server;