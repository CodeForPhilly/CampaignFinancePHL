'use strict';

(function(data) {

	var pg = require('pg'),
		config = require('../config.js');
	var conString = config.pgConnectionString;


	data.getCandidateSummaries = function(next) {
		pg.connect(conString, function(err, client, done) {
			if (err) {
				return console.error('error fetching client from pool', err);
			}
			var query = 
			client.query('SELECT name, amount FROM contributions ORDER BY amount DESC LIMIT 10', function(err, results) {
				done();
				console.log(results.rows);
			});

		});
		pg.end();
	}

}(module.exports));