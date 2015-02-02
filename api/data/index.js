'use strict';

(function(data) {

	var seedData = require('./seedData'),
		database = require('./database'),
		extend = require('extend');

	data.getCandidates = function(next) {
		database.getDb(function(err, db){
			if (err){
				next(err, null);
			} else {
				db.candidates.find(null, {_id: 0}).toArray(function(err, results){
					if (err){
						next(err, null);
					} else {
						next(null, results);
					}
				});
			}
		});
	};

	data.getCommittees = function(next){
		database.getDb(function(err, db){
			if (err){
				next(err, null);
			} else {
				// db.contributions.aggregate([
				// {
				// 	$group: { _id: '$name'}
				// }, 
				// {
				// 	$project: { field: 1, _id: 1, nameLowered : { $toLower: '$_id'}}
				// }, 
				// {
				// 	$sort : { nameLowered: 1 }
				// }
				//])
				db.contributions.distinct('name', function(err, results){
					if (err){
						next(err, null);
					} else {
						next(null, results);
					}
				});
			}
		});	
	};

	data.getContributions = function(next){
		database.getDb(function(err, db){
			if (err){
				next(err, null);
			} else {
				db.contributions.find(null, {_id: 0}).toArray(function(err, results){
					if (err){
						next(err, null);
					} else {
						next(null, results);
					}
				});
			}
		});	
	};

	data.getContributionsTotal = function(committee, next){
		database.getDb(function(err, db){
			if (err){
				next(err, null);
			} else {
				db.contributions.find(null, {_id: 0}).toArray(function(err, results){
					if (err){
						next(err, null);
					} else {
						next(null, results);
					}
				});
			}
		});
	};

	data.getCandidateSummaries = function(next){
		var committeesArray = [],
			summaries = [];
		database.getDb(function(err, db){
			if (err){
				next(err, null);
			} else {
				// Get the candidates...
				db.candidates.find().toArray(function(err, candidates){
					if (err) {
							next(err, null);
					} else {
						// Get committee names
						candidates.forEach(function(candidate){
							committeesArray.push(candidate.committeeName);
						});
						var match = { $match: {reportedBy: {$in : committeesArray}}};
						db.contributions.aggregate([
							match, 
							{
								$group: {
									_id: '$reportedBy',
									totalRaised: { $sum: '$amount'},
									numberOfContributions: { $sum: 1}
								}
							},
							{
								$sort: { totalRaised: -1}
							}]).toArray(function(err, results){
								if (err) {
									next(err, null);
								} else {
									results.forEach(function(summary){
										var committeeName = summary._id;
										// Find the summary for the candidate's committee
										var candidate = candidates.filter(function(x) { 
											return x.committeeName === committeeName; 
										})[0];
										if (candidate){
											extend(summary, candidate);
										}
										summaries.push(summary);
									});
									next(null, summaries);
								}
						});
					}
				});
			}
		});
	};

	function seedDatabase() {
		database.getDb(function(err, db) {
			if (err) {
				console.log('ERROR: Failed to seed database...');
			} else {
				db.candidates.count(function(err, count) {
					if (err) {
						console.log('ERROR: Failed to retrieve db count for seeding...');
					} else {
						if (count === 0) {
							seedData.initialCandidates.forEach(function(item) {
								db.candidates.insert(item, function(err) {
									if (err) {
										console.log('Failed to insert seed data item:');
										console.log(item);
									}
								});
							});

						}
					}
				});
			}
		});
	}

	seedDatabase();

}(module.exports));