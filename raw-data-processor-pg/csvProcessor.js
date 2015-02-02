'use strict';

var fs = require('fs');
var path = require('path');
var csvParser = require('csv-parse');
var Contribution = require('./Contribution.js');


module.exports = function(fileName, done) {
	var savingFiles = 0, wasEmpty = true;
	// Create the contribution parser
	var contribParser = csvParser({
		columns: Contribution.columnsDefinition
	});

	var splitFile = fileName.split(path.sep);
	var reportedOn = splitFile[splitFile.length - 2];
	var reportedBy = splitFile[splitFile.length - 3];


	//Use the writable stream api
	contribParser.on('readable', function() {
		wasEmpty = false;
		var record = contribParser.read();

		function saveCallback(err) {
			if (err) {
				console.log('error saving...');
				console.log(err);
				throw err;
			}
			//console.log('Saved record' + (new Date()).toString());
			if (--savingFiles === 0){
				done();
			}
			//console.log('Saved!');
		}
		while (record) {
			//console.log('Found record' + record.name);
			savingFiles++;
			record.reportedOn = reportedOn;
			record.reportedBy = reportedBy;
			var contrib = new Contribution(record);
			contrib.save(saveCallback);
			record = contribParser.read();
		}
	});

	contribParser.on('finish', function() {
		// If the stream was empty, call done()
		if (wasEmpty){
			done();
		}
	});


	if (fileName.indexOf('contrib.txt') > -1) {
		fs.createReadStream(fileName).pipe(contribParser);
	} else {
		done();
	}
};