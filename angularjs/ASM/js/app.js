var LOGIN_API = "https://youtube-api-challenger.appspot.com/authentication";
var userId = localStorage.getItem("userId");
var secretToken = localStorage.getItem("secretToken");

var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider
	.when('/home', { templateUrl: 'home.html'})
	.when('/page2', { templateUrl: 'page2.html'})
	.when('/page3', { templateUrl: 'page3.html'});
});

app.controller('homeController', ['$scope', '$http', function($scope, $http){
	$scope.loadVideo = function(keyword){
		var YOUTUBE_API = "https://content.googleapis.com/youtube/v3/search?q=" + keyword + "&type=video&videoEmbeddable=true&videoSyndicated=true&maxResults=9&part=snippet&key=AIzaSyAwUjk3CwtXCiB_W6Xi0colfOKPgm90hHc";
		$http({
			method: "GET",
			url: YOUTUBE_API,
		}).then(function(response){
			$scope.youtubeItems = response.data.items;
			console.log(response);
		}, function(response){
			alert("Fail");
		});
	}
	$scope.loadVideo("hà anh tuấn");
}])
