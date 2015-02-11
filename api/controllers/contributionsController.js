'use strict';

(function(contributionsController){

	var	config = require('../config.js'),
		dataService = require(config.dataModule);

	contributionsController.init = function(app){
		app.get('/api/v1/contributions', function(req, res){
			var rawQueryParams = req.query,
				queryParams = {};
				
			for (var param in rawQueryParams){
				var underscoredParam = param.replace(/([A-Z])/g, function($1){return '_'+$1.toLowerCase();});
				queryParams[underscoredParam] = rawQueryParams[param];
			}
			dataService.getContributions(queryParams, function(err, results){
				if (err) {
					res.send(500, err);
				} else {
					res.set('X-Total-Count', results.count);
					res.send(results.models);
				}
			});
		});

		app.get('/api/v1/contributions/philly', function(req, res){
			var candidateId = req.query.committee_id;
			dataService.getInPhillyContribRatio(candidateId, function(err, result){
				if (err){
					res.send(500, err);
				} else {
					res.send(result);
				}
			});
		});
	};

}(module.exports));