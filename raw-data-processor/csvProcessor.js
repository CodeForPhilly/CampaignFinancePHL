'use strict';

var fs = require('fs');
var path = require('path');
var csvParser = require('csv-parse');
var Contribution = require('./Contribution.js');


module.exports = function(fileName, done) {
	var savingFiles = 0;
	// Create the contribution parser
	var contribParser = csvParser({
		columns: Contribution.columnsDefinition
	});

	var splitFile = fileName.split(path.sep);
	var reportedOn = splitFile[splitFile.length - 2];
	var reportedBy = splitFile[splitFile.length - 3];

	//Use the writable stream api
	contribParser.on('readable', function() {
		var record = contribParser.read();

		function saveCallback(err) {
			if (err) {
				console.log('error saving...');
				console.log(err);
			}
			if (--savingFiles === 0){
				done();
			}
			//console.log('Saved!');
		}
		while (record) {
			savingFiles++;
			record.reportedOn = reportedOn;
			record.reportedBy = reportedBy;
			var contrib = new Contribution(record);
			contrib.save(saveCallback);
			record = contribParser.read();
		}
	});

	// contribParser.on('finish', function() {
	// 	// DO something to indicate we're done.
	// 	done();
	// });


	if (fileName.indexOf('contrib.txt') > -1) {
		fs.createReadStream(fileName).pipe(contribParser);
	} else {
		done();
	}
};