'use strict';

(function(database){
	var mongodb = require('mongodb');
	var mongoUrl = 'mongodb://odp:Password1@ds031611.mongolab.com:31611/opendisclosurephilly';
	var theDb = null;

	database.getDb = function(next) {
		// Important! Don't just connect every time. MongoDB has pooling...you'll screw it up.
		if (!theDb){
			// connect to the database
			mongodb.MongoClient.connect(mongoUrl, function(err, db){
				if (err){
					next(err, null);
				} else {
					theDb = {
						db: db,
						candidates: db.collection('candidates'),
						contributions: db.collection('contributions')
					};
					next(null, theDb);
				}
			});
		} else {
			next(null, theDb);
		}
	};

})(module.exports);