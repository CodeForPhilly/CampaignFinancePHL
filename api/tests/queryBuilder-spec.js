'use strict';

/* global describe, it, expect */


var qb = require('../data-postgres/queries/query-builder.js');

describe('query building', function() {
	var queryText = 'SELECT name FROM my_table%s%s;';

	it('leaves WHERE clause blank if no params', function() {
		var clause = qb.setUpQuery(queryText);

		expect(clause).toBe('SELECT name FROM my_table;');
	});

	it('tacks on a single WHERE clause for given param', function() {
		var allowedQueryParams = ['committee_id'],
			params = {'committee_id': '3'},
			clause = qb.setUpQuery(queryText, allowedQueryParams, params);

		expect(clause).toEqual({text: 'SELECT name FROM my_table WHERE committee_id = $1;', values: ['3']});
	});

	it('includes paging clauses', function(){
		var allowedQueryParams = ['page_size', 'page'],
			params = {'page_size': '3', 'page': '3'},
			clause = qb.setUpQuery(queryText, allowedQueryParams, params),
			expectedResult = {
				text: 'SELECT name FROM my_table LIMIT $1 OFFSET $2;',
				values: [3, 6]
			};

		expect(clause).toEqual(expectedResult);
	});

	it('includes paging and a where caluse', function(){
		var allowedQueryParams = ['page_size', 'page', 'committee_id'],
			params = {'page_size': '5', 'committee_id' : '314'} ,
			clause = qb.setUpQuery(queryText, allowedQueryParams, params),
			expectedResult = {
				text: 'SELECT name FROM my_table WHERE committee_id = $3 LIMIT $1 OFFSET $2;',
				values: [5, 0, '314']
			};

		expect(clause).toEqual(expectedResult);

	});

	it('includes paging and two where clauses', function(){
		var allowedQueryParams = ['page_size', 'page', 'committee_id', 'city'],
			params = {'page_size': '5', 'committee_id' : '314', city: 'Mytown'} ,
			clause = qb.setUpQuery(queryText, allowedQueryParams, params),
			expectedResult = {
				text: 'SELECT name FROM my_table WHERE committee_id = $3 AND city = $4 LIMIT $1 OFFSET $2;',
				values: [5, 0, '314', 'Mytown']
			};

		expect(clause).toEqual(expectedResult);

	});


});