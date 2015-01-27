'use strict';

var http = require('http'),
	express = require('express'),
	controllers = require('./controllers');

var app = express();

controllers.init(app);

http.createServer(app).listen(3000);