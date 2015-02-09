'use strict';

(function(queryBuilder) {

	var util = require('util');

	var defaultPageSize = 1000;

	function processWhereParam(whereClause, paramValues, allowedParam, idx, requestedParams) {
		if (whereClause.substr(0, 7) !== ' WHERE ') {
			whereClause += ' WHERE ';
		} else {
			whereClause += ' AND ';
		}
		whereClause += allowedParam + ' = $' + (idx + 1);
		paramValues.push(requestedParams[allowedParam]);

		return whereClause;
	}

	function handlePaging(allowedParams, requestedParams, paramValues) {
		// If allowed, and requestParams has it, set page size. Otherwise default.
		if (allowedParams.indexOf('page') > -1 || allowedParams.indexOf('page_size') > -1) {
			var pageSize = allowedParams.indexOf('page_size') > -1 && 
				requestedParams.hasOwnProperty('page_size') ? 
				parseInt(requestedParams.page_size) : defaultPageSize,
				offset = allowedParams.indexOf('page') > -1 && 
				requestedParams.hasOwnProperty('page') ? 
				(parseInt(requestedParams.page) - 1) * pageSize : 0;

			delete requestedParams.page;
			delete requestedParams.page_size;
			paramValues.push(pageSize);
			paramValues.push(offset);
			return {
				pagingClause : ' LIMIT $1 OFFSET $2',
				requestedParams: requestedParams,
				paramIdx: 2
			};
		} else {
			return '';
		}

	}

	queryBuilder.setUpQuery = function(queryText, allowedParams, requestedParams, configPageSize) {
		var whereClause = '',
			pagingClause = '',
			pagingResult,
			paramValues = [],
			paramIdx = 0;
		defaultPageSize = configPageSize ? configPageSize : defaultPageSize;

		if (allowedParams) {
			pagingResult = handlePaging(allowedParams, requestedParams, paramValues);
			if (pagingResult){
				pagingClause = pagingResult.pagingClause;
				requestedParams = pagingResult.requestedParams;
				paramIdx = pagingResult.paramIdx;
			}

			allowedParams.forEach(function(allowedParam, idx) {
				if (requestedParams.hasOwnProperty(allowedParam)) {
					whereClause = processWhereParam(whereClause, paramValues, allowedParam, idx, requestedParams);
				}
			});
		}

		queryText = util.format(queryText, whereClause, pagingClause);
		if (paramValues.length) {
			return {
				text: queryText,
				values: paramValues
			};
		} else {
			return queryText;
		}
	};

}(module.exports));