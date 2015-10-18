var _ = require('underscore'),
    http = require('http'),
    request = require('request'),
    async = require('async'),
    express = require('express'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    loadUsers = require('./loadUsers.js')(_, request, async, fs);

var app = express();

app.use(bodyParser.json());
app.use(express.static('app'));

app.get('/users/:count', function(req, res){
    if(!_.isNumber(+req.params.count)){
        res.status(400).json({
            message: 'Parameter "count" must be a number'
        });
    } else {
        loadUsers(+req.params.count, function(err, data){
            if(err){
                res.status(400).json(err);
            } else {
                res.json(data);
            }
        })
    }
});

var srv = http.createServer(app).listen(8080);

process.on('uncaughtException', function(err){
    console.log(err);
    console.log(err.stack);
});
