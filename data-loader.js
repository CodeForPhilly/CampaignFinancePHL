'use strict';

var mongoose = require('mongoose');
var directoryTraverser = require('./directoryTraverser');
var csvProcessor = require('./csvProcessor');

// Mongo & Mongoose
mongoose.connect('mongodb://odp:Password1@ds031611.mongolab.com:31611/opendisclosurephilly');
var db = mongoose.connection;

function cleanup() {
	db.close();
}

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('DB connected...');
	//console.log(db.collections);
	//Drop the collection and start fresh:
	db.collections.contributions.drop(function(err) {
		if (err) {
			console.log(err);
			console.log('Could not drop collection. Proceeding anyway...');
		}
		directoryTraverser.processFiles('raw-data/2011/2011 Cycle 6/Nutter for Mayor', csvProcessor, cleanup);
	});
});