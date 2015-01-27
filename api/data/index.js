'use strict';

(function(data) {

	var seedData = require('./seedData'),
		database = require('./database');

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
				db.contributions.distinct('reportedBy', function(err, results){
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