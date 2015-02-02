'use strict';

(function(contributionsController){

	var dataService = require('../data');

	contributionsController.init = function(app){
		app.get('/api/v1/contributions', function(req, res){

			var filterParams = req.query;
			console.log(filterParams);

			dataService.getContributions(function(err, results){
				if (err) {
					res.send(500, 'We\'re having some trouble right now...');
				} else {
					res.send(results);
				}
			});
		});

		app.get('/api/v1/contributions/totals', function(req, res){

			var committee = req.query.committee;

			dataService.getContributionsTotal(committee, function(err, results){
				if (err) {
					res.send(500, 'We\'re having some trouble right now...');
				} else {
					res.send(results);
				}
			});
		});	
	};

}(module.exports));