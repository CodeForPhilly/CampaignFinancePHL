'use strict';

(function(angular){
	var CFPApp = angular.module('CFPApp', ['ngRoute', 'ngResource']);
	
	CFPApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
		$locationProvider.html5Mode(true);
		$routeProvider.when('/', {
			templateUrl: 'partials/home.html',
			controller: 'HomeCtrl'
		}).when('/admin/committees', {
			templateUrl: 'partials/admin/committees.html',
			controller: 'AdminCommitteesCtrl'
		}).when('/candidates/:id', {
			templateUrl: 'partials/candidate-detail.html',
			controller: 'CandidateCtrl'
		});
	}]);

	CFPApp.controller('HomeCtrl', ['$scope', function($scope){
		$scope.hello = 'Hello, Angular';
	}]);

	CFPApp



	CFPApp.service('candidatesSvc', ['$resource', function($resource){
		var svc = {},
			resource = $resource('http://localhost:3000/api/v1/candidates/summaries');

		svc.getCandidateSummaries = function(){
			return resource.query();
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

	CFPApp.controller('CandidatesSummaryCtrl', ['$scope', 'candidatesSvc', function($scope, candidatesSvc){
		$scope.candidates = candidatesSvc.getCandidateSummaries();
	}]);

	CFPApp.controller('AdminCommitteesCtrl', ['$scope', 'committeesSvc', function($scope, committeesSvc){
		$scope.committees = committeesSvc.getCommittees();
	}]);

}(window.angular));