'use strict';

(function(candidatesController){

	var dataService = require('../data');

	candidatesController.init = function(app){
		app.get('/api/v1/candidates', function(req, res){
			dataService.getCandidates(function(err, results){
				res.send(results);
			});
		});	
		app.get('/api/v1/candidates/:id', function(req, res){
			var id = req.params.id;
			res.send(['candidate' + id]);
		});	
	};

}(module.exports));