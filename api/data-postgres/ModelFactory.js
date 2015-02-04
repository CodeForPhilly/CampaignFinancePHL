'use strict';

(function(ModelFactory){

	function createCandidateSummary(result){
		return {
			firstName: result.first_name,
			lastName: result.last_name,
			imageUrl: result.image_url,
		};
	}

	ModelFactory.createCandidateSummaries = function(results) {
		return results.map(createCandidateSummary);	
	};

}(module.exports));