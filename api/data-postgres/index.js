'use strict';

(function(data) {

	var pg = require('pg'),
		config = require('../config.js'),
		queries = require('./queries'),
		ModelFactory = require('./ModelFactory');
	var conString = config.pgConnectionString;


	data.getCandidateSummaries = function(next) {
		pg.connect(conString, function(err, client, done) {
			if (err) {
				return console.error('error fetching client from pool', err);
			}
			//var query = 'select can.first_name as first_name, can.last_name as last_name, can.image_url from candidates can';
			var query = queries.selectCandidateSummaries;
			client.query(query, function(err, results) {
				done(); // release the db connection with this call
				console.log(results.rows);
				var models = ModelFactory.createCandidateSummaries(results.rows);
				next(null, models);
			});

		});
		pg.end();
	};

}(module.exports));