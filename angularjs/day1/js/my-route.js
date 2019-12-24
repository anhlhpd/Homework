var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider
	.when('/page1', { templateUrl: 'page1.html'})
	.when('/page2', { templateUrl: 'page2.html'})
	.when('/page3', { templateUrl: 'page3.html'});
});

app.directive('directiveName', function(){
	return {
		restrict: 'AEC',
		template: 'This is custom directive.'
	}
});