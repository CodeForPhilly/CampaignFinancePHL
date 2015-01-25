'use strict';

function Logger(){
	this.logError = function (msg){
		console.log('ERROR: ' + msg);
	};

	this.log = function(msg, indentLevel){
		var indent = parseInt(indentLevel), tabs = '';
		if (indent){
			for (var i=0; i < indent; i++){
				tabs = tabs + '\t';
			}
		}
		console.log(tabs + msg);
	};
}

module.exports = Logger;