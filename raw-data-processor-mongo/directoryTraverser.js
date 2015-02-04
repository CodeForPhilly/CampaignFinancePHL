'use strict';

var Logger = require('../utility/Logger');
var path = require('path');

var logger = new Logger();

function processFiles(startPath, fileHandler, finalDone) {



	var fs = require('fs');
	var walk = function(dir, done) {
		var results = [];
		console.log('Reading directory ' + dir);
		fs.readdir(dir, function(err, list) {

			//if (err) return done(err);
			if (err) {
				console.log('ERROR');
				console.log(err);
				throw err;

			}
			var pending = list.length;
			console.log('Read directory ' + dir + ' and found ' + pending + ' results');
			if (!pending) return done(null, results);
			list.forEach(function(file) {
				file = path.join(dir, file);
				fs.stat(file, function(err, stat) {
					if (stat && stat.isDirectory()) {
						walk(file, function(err, res) {
							//results = results.concat(res);
							if (err) {
								logger.log('ERROR!!!!!!');
								logger.log(err);
								throw err;
							}
							if (!--pending) done(null, results);
						});
					} else {
						fileHandler(file, function() {
							//results.push(file);
							//logger.log('Completed file ' + file);
							//logger.log('Pending: ' + pending);	
							if (!--pending) done(null, results);
						});
					}
				});
			});
		});
	};

	walk(startPath, function(err, results) {
		if (err) throw err;
		//results.forEach(function(file){logger.log(file)});
		finalDone();
	});
}

module.exports.processFiles = processFiles;