'use strict';

(function(controllers){
	var candidatesController = require('./candidatesController');
	var committeesController = require('./committeesController');
	var contributionsController = require('./contributionsController');

	controllers.init = function(app){
		candidatesController.init(app);
		committeesController.init(app);
		contributionsController.init(app);
	};

})(module.exports);