var createError = require('http-errors');
var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/GameMario.html'));
});

app.listen(8080);

module.exports = app;
