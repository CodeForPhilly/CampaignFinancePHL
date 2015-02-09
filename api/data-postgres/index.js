'use strict';

(function(data) {

	var pg = require('pg'),
		config = require('../config.js'),
		queries = require('./queries'),
		ModelFactory = require('./ModelFactory'),
		connString = config.pgConnectionString;

	//function executeQuery()

	// **** Candidates **** //
	data.getCandidate = function(id, next){
		pg.connect(connString, function(err, client, done){
			if (err) {
				return console.error('error fetching client from pool', err);
			}
			var query = queries.selectCandidate;
			client.query({text: query, values: [id]}, function(err, results){
				done();
				var model = results.rows.length ? ModelFactory.createCandidate(results.rows) : {};
				next(null, model);
			});
		});
	};

	data.getCandidateSummaries = function(next) {
		pg.connect(connString, function(err, client, done) {
			if (err) {
				return console.error('error fetching client from pool', err);
			}
			//var query = 'select can.first_name as first_name, can.last_name as last_name, can.image_url from candidates can';
			var query = queries.selectCandidateSummaries;
			client.query(query, function(err, results) {
				done(); // release the db connection with this call
				var models = ModelFactory.createCandidateSummaries(results.rows);
				next(null, models);
			});
		});
		pg.end();
	};

	// **** Contributions **** //
	data.getContributions = function(queryParams, next) {
		pg.connect(connString, function(err, client, done) {
			if (err) {
				return console.error('error fetching client from pool', err);
			}
			var query = queries.selectContributions(queryParams);
			client.query(query, function(err, results) {
				done(); // release the db connection with this call
				console.log(results);
				var models = ModelFactory.createContributions(results.rows);
				next(null, {models: models, count: results.rowCount});
			});
		});
		pg.end();
	};

	data.getInPhillyContribRatio = function(committeeId, next) {
		pg.connect(connString, function(err, client, done) {
			if (err) {
				return console.error('error fetching client from pool', err);
			}
			var query = queries.selectInPhillyContribRatio;
			client.query({text: query, values: [committeeId]}, function(err, results){
				done();

				next(null, results);
			});
		});
	};

	data.getCandidateTotals = function(candidateId, next){
		pg.connect(connString, function(err, client, done) {
			if (err) {
				return console.error('error fetching client from pool', err);
			}
			var query = queries.selectCandidateTotals;
			client.query({text: query, values: [candidateId]}, function(err, result){
				done();
				var model = ModelFactory.createCandidateTotals(result);
				next(null, model);
			});
		});
	};

}(module.exports));