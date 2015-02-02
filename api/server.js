'use strict';

var http = require('http'),
	express = require('express'),
	cors = require('cors'),
	controllers = require('./controllers');

var app = express();
app.use(cors());
controllers.init(app);

http.createServer(app).listen(3000);