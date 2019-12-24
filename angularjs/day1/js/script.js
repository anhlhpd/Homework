var LOGIN_API = "https://youtube-api-challenger.appspot.com/authentication";
var MEMBER_API = "https://youtube-api-challenger.appspot.com/members";

var app = angular.module("myApp", []);
app.controller('myController', function($scope, $http){
	// $scope.items = [
	// {
	// 	username: 'xuanhung',
	// 	password: '1'
	// },
	// {
	// 	username: 'xuanhung1',
	// 	password: '2'
	// },
	// {
	// 	username: 'xuanhung2',
	// 	password: '3'
	// }
	// ]
	// $scope.loginData = {
	// 	data: {
	// 		type: 'MemberLogin',
	// 		attributes: {
	// 			username: '',
	// 			password: ''
	// 		}
	// 	}
	// }
	// $scope.doLogin = function() {
	// 	$http({
	// 		method: "POST",
	// 		url: LOGIN_API,
	// 		data: JSON.stringify($scope.loginData),
	// 	}).then(function onSuccess(response) {
	// 		localStorage.setItem("secretToken", response.data.data.attributes.secretToken);
	// 		localStorage.setItem("userId", response.data.data.attributes.userId);
	// 	}, function onError(response) {
	// 		alert(JSON.stringify(response));
	// 	})
	// };

	$scope.loadVideo = function(keyword){
		var YOUTUBE_API = "https://content.googleapis.com/youtube/v3/search?q=" + keyword + "&type=video&videoEmbeddable=true&videoSyndicated=true&maxResults=9&part=snippet&key=AIzaSyAwUjk3CwtXCiB_W6Xi0colfOKPgm90hHc";
		var startTime = new Date().getTime();
		$http({
			method: "GET",
			url: YOUTUBE_API,
		}).then(function(response){
			var endTime = new Date().getTime();
			loadTime = endTime - startTime;
			$scope.youtubeItems = response.data.items;
			$scope.searchInfo = "Load trong " + loadTime + " milliseconds."
		}, function(response){
			alert("Fail");
		});
	}
	$scope.loadVideo("hà anh tuấn");
});

// app.controller('registerForm', function($scope, $http){
// 	var milli = $scope.birthDay.getTime();
// 	$scope.registerData = {
// 		data: {
// 				type: "Member",
// 				attributes: {
// 					username: '',
// 					password: '',
// 					fullName: '',
// 					email: '',
// 					birthDay: '',
// 					gender: 1,
// 				}
// 		}
// 	}


// 	$scope.doRegister = function() {
// 		$scope.registerData.data.attributes.birthDay = $scope.birthDay.getTime();
// 		$http({
// 			method: "POST",
// 			url: MEMBER_API,
// 			data: JSON.stringify($scope.registerData),
// 		}).then(function onSuccess(response) {
// 			alert("Register success");
// 		}, function onError(response) {
// 			alert(JSON.stringify(response));
// 		});
// 	}
// });