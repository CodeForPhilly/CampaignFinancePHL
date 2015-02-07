'use strict';

(function(ModelFactory){

	function createCandidateSummary(result){
		return {
			id: result.candidate_id,
			firstName: result.first_name,
			lastName: result.last_name,
			imageUrl: result.image_url,
			totalRaised: result.total_raised,
			numberOfContributions: result.number_of_contributions
		};
	}

	ModelFactory.createCandidateSummaries = function(results) {
		return results.map(createCandidateSummary);	
	};

}(module.exports));