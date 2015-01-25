'use strict';

var Logger = require('../Logger');
var path = require('path');

var logger = new Logger();

function processFiles(startPath, fileHandler, finalDone) {



	var fs = require('fs');
	var walk = function(dir, done) {
		var results = [];

		fs.readdir(dir, function(err, list) {
			if (err) return done(err);
			var pending = list.length;
			if (!pending) return done(null, results);
			list.forEach(function(file) {
				file = path.join(dir, file);
				fs.stat(file, function(err, stat) {
					if (stat && stat.isDirectory()) {
						walk(file, function(err, res) {
							results = results.concat(res);
							if (!--pending) done(null, results);
						});
					} else {
						fileHandler(file, function() {
							results.push(file);
							if (!--pending) done(null, results);
						});
					}
				});
			});
		});
	};

	walk(startPath, function(err, results) {
		if (err) throw err;
		results.forEach(function(file){logger.log(file)});
		finalDone();
	});
}

module.exports.processFiles = processFiles;