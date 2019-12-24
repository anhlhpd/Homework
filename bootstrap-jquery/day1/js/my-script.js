// $("[type='submit']").click(function() {
// 	alert("Check me: " + $.trim(""))
// });

// var LOGIN_API = "https://youtube-api-challenger.appspt.com/authentication";

// $(*[type='']).click(function(){
// 	var loginData = {
// 		"data": {
// 			"type": "MemberLogin",
// 			"attributes": {
// 				"username": $
// 				"password": $
// 			}
// 		}
// 	}
// 	$.ajax({
// 		url: LOGIN_API,
// 		type: "POST",
// 		data: JSON.stringify(loginData),
// 		success: function(response){
// 			alert(response.data.attributes.secretToken);
// 		},
// 		error: function(error,status){
// 			console.log(error);
// 			console.log(status);
// 		}
// 	});
// });

$(document).ready(function(){
	$("#result").load("index.html");
});