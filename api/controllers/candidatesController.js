'use strict';

(function(candidatesController){

	var	config = require('../config.js'),
		dataService = require(config.dataModule);

	candidatesController.init = function(app){

		app.get('/api/v1/candidates/summaries', function(req, res){
			dataService.getCandidateSummaries(function(err, results){
				res.send(results);
			});	
		});

		app.get('/api/v1/candidates/:id', function(req, res){
			var id = req.params.id;
			dataService.getCandidate(id, function(err, results){
				res.send(results);
			});
		});

		app.get('/api/v1/candidates', function(req, res){
			dataService.getCandidates(function(err, results){
				res.send(results);
			});
		});

		app.get('/api/v1/candidates/:id/totals', function(req, res){
			var candidateId = req.params.id;
			dataService.getCandidateTotals(candidateId, function(err, result) {
				if (err) {
					res.send(500, 'We\'re having some trouble right now...');
				} else {
					res.send(result);
				}
			});
		});	
	};

}(module.exports));