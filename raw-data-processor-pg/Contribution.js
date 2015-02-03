'use strict';

(function(Contribution){
	var pg = require('pg'),
		columnsArray = [
			'col0',
			'year',
			'cycle',
			'schedule',
			'name',
			'address1',
			'address2',
			'city',
			'state',
			'zip',
			'profession',
			'employer',
			'employerAddress1',
			'employerAddress2',
			'employerCity',
			'employerState',
			'employerZip',
			'date',
			'amount',
			'col19',
			'col20',
			'col21',
			'col22',
			'description'];

  	Contribution = function(obj){
    	this.sqlString = "INSERT INTO contributions (" + columnsArray.join(',') +
    		" VALUES (" + "%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,"
  'cycle',
  'schedule',
  'name',
  'address1',
  'address2',
  'city',
  'state',
  'zip',
  'profession',
  'employer',
  'employerAddress1',
  'employerAddress2',
  'employerCity',
  'employerState',
  'employerZip',
  'date',
  'amount',
  'col19',
  'col20',
  'col21',
  'col22',
  'description'"
  	}

}(module.exports));