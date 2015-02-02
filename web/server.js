'use strict';

var http = require('http'),	
	express = require('express'),
	app = express();

app.use(express.static(__dirname + '/public'));

app.get('*', function(req, res){
	res.sendFile(__dirname + '/views/index.html');
});

var server = http.createServer(app);

server.listen(3001);	