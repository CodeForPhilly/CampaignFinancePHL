'use strict';

(function(queries){

	var fs = require('fs');

	queries.selectCandidateSummaries = fs.readFileSync(__dirname + '/get_candidate_summaries.sql').toString();
}(module.exports));