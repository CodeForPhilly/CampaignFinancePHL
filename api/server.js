'use strict';

var http = require('http'),
	express = require('express'),
	cors = require('cors'),
	controllers = require('./controllers');

var app = express();
app.use(cors());
app.use(function(req, res, next){
	res.set('Access-Control-Expose-Headers', 'X-Total-Count');
	next();
});
controllers.init(app);

http.createServer(app).listen(3000);