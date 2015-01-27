'use strict';

(function(committeeController){

	var dataService = require('../data');

	committeeController.init = function(app){
		app.get('/api/v1/committees', function(req, res){
			dataService.getCommittees(function(err, results){
				if (err) {
					res.send(500, 'We\'re having some trouble right now...');
				} else {
					res.send(results);
				}
			});
		});
	};

}(module.exports));