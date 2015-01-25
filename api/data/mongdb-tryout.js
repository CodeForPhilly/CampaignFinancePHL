'use strict';

(function(database){
	var mongodb = require('mongodb');
	var mongoUrl = 'mongodb://odp:Password1@ds031611.mongolab.com:31611/opendisclosurephilly';
	var theDb = null;

	mongodb.getDb = function(next) {
		// Important! Don't just connect every time. MongoDB has pooling...you'll screw it up.
		if (!theDb){
			// connect to the database to create it
		} else {

		}
	};

})(module.exports);