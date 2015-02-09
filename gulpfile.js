'use strict'; 

var gulp = require('gulp'),
	nodemon = require('gulp-nodemon'),
	shell = require('gulp-shell');

gulp.task('api', function() {
	// place code for your default task here
	nodemon({
		script: 'api/server.js',
		ext: 'js, sql',
		env: { 'NODE_ENV': 'development' },
		ignore: ['./build/**'],
		nodeArgs: []
	});
});

gulp.task('web', function() {
	// place code for your default task here
	nodemon({
		script: 'web/server.js',
		ext: 'html, js',
		env: { 'NODE_ENV': 'development' },
		ignore: ['./build/**'],
		nodeArgs: []
	});
	shell.task([
		'chrome']);
});

gulp.task('load-data', shell.task([
	'psql -f database/postgres/setup.sql',
	'ruby raw-data-processor-postgres/load-data.rb',
	'psql -d campaign_finance_phl -f raw-data/inserts.sql'
]));