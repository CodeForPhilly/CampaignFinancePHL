'use strict';

(function(angular){

	var util = angular.module('util', []);
	util.filter('offset', function(){
		return function(input, start){
			start = parseInt(start, 10);
			return input.slice(start);
		};
	});

	var CFPApp = angular.module('CFPApp', ['ui.router', 'ngResource', 'util']);
	
	CFPApp.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider){
		$locationProvider.html5Mode(true);
		$stateProvider.state('home', {
			url: '/',
			templateUrl: 'partials/home.html',
			controller: 'HomeCtrl'
		}).state('admin-committees', {
			url: '/admin/committees',
			templateUrl: 'partials/admin/committees.html',
			controller: 'AdminCommitteesCtrl'
		})
		.state('candidate-detail', {
			url: '/candidates/:id',
			templateUrl: 'partials/candidate-detail.html',
			controller: 'CandidateCtrl'
		});
	}]);

	CFPApp.controller('HomeCtrl', ['$scope', function($scope){
		$scope.hello = 'Hello, Angular';
	}]);

	CFPApp.controller('CandidatesSummaryCtrl', ['$scope', 'candidatesSvc', function($scope, candidatesSvc){
		$scope.candidates = candidatesSvc.getCandidateSummaries();
	}]);

	CFPApp.controller('AdminCommitteesCtrl', ['$scope', 'committeesSvc', function($scope, committeesSvc){
		$scope.committees = committeesSvc.getCommittees();
	}]);

	CFPApp.controller('CandidateCtrl', ['$scope', '$stateParams', 'candidatesSvc', 'contributionsSvc', 
		function($scope, $stateParams, candidatesSvc, contributionsSvc){
		var id = $stateParams.id;
		$scope.candidate = candidatesSvc.getCandidate(id);
		$scope.contribsPerPage = 10000;
		$scope.currentContribPage = 0;
		$scope.contribsOrderBy = null;
		$scope.contributions = contributionsSvc.getContributionsForCandidate(id, function(value, headers){
			$scope.contribsCount = headers['X-Total-Count'];
		});



		$scope.totals = candidatesSvc.getTotals(id);
	}]);



	CFPApp.service('candidatesSvc', ['$resource', function($resource){
		var svc = {},
			candidatesResource = $resource('http://localhost:3000/api/v1/candidates/:id'),
			summariesResource = $resource('http://localhost:3000/api/v1/candidates/summaries'),
			candidateTotalsResource = $resource('http://localhost:3000/api/v1/candidates/:id/totals');

		svc.getCandidate = function (id) {
			return candidatesResource.get({id: id});
		};

		svc.getCandidateSummaries = function(){
			return summariesResource.query();
		};

		svc.getTotals = function(id){
			return candidateTotalsResource.get({id: id});
		};
		return svc;
	}]);
	CFPApp.service('committeesSvc', ['$resource', function($resource){
		var svc = {},
			Resource = $resource('http://localhost:3000/api/v1/committees');

		svc.getCommittees = function(){
			return Resource.query();
		};
		return svc;
	}]);
	CFPApp.service('contributionsSvc', ['$resource', function($resource){
		var svc = {},
			Resource = $resource('http://localhost:3000/api/v1/contributions');

		svc.getContributionsForCandidate = function(id, success){
			return Resource.query({candidateId: id}, success);
		};
		return svc;
	}]);


}(window.angular));