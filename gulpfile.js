'use strict'; 

var gulp = require('gulp'),
	nodemon = require('gulp-nodemon'),
	shell = require('gulp-shell');

gulp.task('default', function() {
	// place code for your default task here
	nodemon({
		script: 'api/server.js',
		ext: 'js',
		env: { 'NODE_ENV': 'development' },
		ignore: ['./build/**'],
		nodeArgs: []
	});
});

gulp.task('shorthand', shell.task([
  'echo hello',
  'echo world'
]));