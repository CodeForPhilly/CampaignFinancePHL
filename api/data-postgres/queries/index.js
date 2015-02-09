'use strict';

(function(queries){

	var fs = require('fs'),
		qb = require('./query-builder.js');

	queries.selectCandidateSummaries = fs.readFileSync(__dirname + '/get_candidate_summaries.sql').toString();
	
	queries.selectCandidate = fs.readFileSync(__dirname + '/get_candidate.sql').toString();

	queries.selectContributions = function(requestedQueryParams){
		var queryText = fs.readFileSync(__dirname + '/get_contributions.sql').toString(),
			allowedQueryParams = ['page', 'page_size', 'committee_id', 'city'],
			result = qb.setUpQuery(queryText, allowedQueryParams, requestedQueryParams);
		return result;
	};

	queries.selectCandidateTotals = fs.readFileSync(__dirname + '/get_candidate_totals.sql').toString();


	queries.selectInPhillyContribRatio = fs.readFileSync(__dirname + '/get_in_philly_contrib_ratio.sql').toString();
}(module.exports));