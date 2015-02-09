'use strict';

(function(ModelFactory){

	// ******* Candiates ********** //

	ModelFactory.createCandidate = function createCandidate(result){
		return {
			id: result[0].candidate_id,
			firstName: result[0].first_name,
			lastName: result[0].last_name,
			committeeId: result[0].committee_id
		};
	};

 	function createCandidateSummary(result){
		return {
			id: result.candidate_id,
			firstName: result.first_name,
			lastName: result.last_name,
			totalRaised: result.total_raised,
			numberOfContributions: result.number_of_contributions,
			numberOfPhillyContributions: result.philly_contributions,
			selfFunded: result.self_funded
		};
	}

	ModelFactory.createCandidateSummaries = function(results) {
		return results.map(createCandidateSummary);	
	};

	ModelFactory.createCandidateTotals = function(results) {
		return {
			id: results.rows[0].candidate_id,
			in: results.rows[0].contrib_amount,
			out: results.rows[0].expense_amount
		};
	};
	
	// **** Contributions ****** //

	function createContribution(result){
		console.log(result);
		return {
			id: result.contribution_id,
			name: result.name,
			amount: result.amount,
			city: result.city
		};
	}

	ModelFactory.createContributions = function(results){
		console.log(results);
		return results.map(createContribution);
	};

}(module.exports));