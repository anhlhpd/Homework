var LOGIN_API = "https://youtube-api-challenger.appspot.com/authentication";
var MEMBER_API = "https://youtube-api-challenger.appspot.com/members";

var btnSubmit = document.getElementById("btnSubmit");
var usernameInput = document.forms["login-form"]["username"];
var passwordInput = document.forms["login-form"]["password"];

function loadUserInfor(){
	var secretToken = localStorage.getItem("secretToken");
	var userId = localStorage.getItem("userId");
	if(secretToken != null && userId != null ){
		var xhr = new XMLHttpRequest();
		xhr.open("GET", MEMBER_API + "/" + userId, true);
		xhr.setRequestHeader("Authorization", secretToken);
		xhr.onreadystatechange = function() {		
			if(this.readyState === XMLHttpRequest.DONE) {
				var responseObject = JSON.parse(this.responseText);
				if(this.status === 200){
					var logout = document.getElementById("logout");
					logout.style = "display: block";
					logout.onclick = function(){
						logoutHandle();
					}
					var main = document.getElementById("main");
					main.style = "display: none";
				} else {
					document.getElementById("total-msg").classList = "error-msg";
					document.getElementById("total-msg").innerHTML = responseObject.errors[0].title + " " + responseObject.errors[0].detail;
				}									
			} 	  
		};
		xhr.send();
	}
}

loadUserInfor();

if(btnSubmit != null){
	btnSubmit.onclick = function(){
		if(checkValidUsername() && checkValidPassword()){
			loginHandle();	
		}		
	}
}

var isValidUsername = true;
var isValidPassword = true;

usernameInput.onkeyup = function(){
	checkValidUsername();
}

passwordInput.onkeyup = function(){
	checkValidPassword();
}

function checkValidUsername(){	
	var spanMsg = usernameInput.nextElementSibling;
	if (usernameInput.value.length == 0){
		spanMsg.classList = "error-msg";
		spanMsg.innerHTML = "Vui lòng nhập username!";				
		isValidUsername = false;
	} else {
			spanMsg.innerHTML = "";
			isValidUsername = true;
		}
	
}

function checkValidPassword(){	
	var spanPasswordMsg = passwordInput.nextElementSibling;
	if (passwordInput.value.length == 0){
		spanPasswordMsg.classList = "error-msg";
		spanPasswordMsg.innerHTML = "Vui lòng nhập password!";
		isValidPassword = false;
	} else {
		spanPasswordMsg.innerHTML = "";
		isValidPassword = true;
		}	
}

function logoutHandle(){	
	if(confirm("Bạn có chắc muốn đăng xuất không?")){
		localStorage.removeItem("secretToken");
		localStorage.removeItem("userId");
		window.location.reload();
		window.location.href = "index.html";
	}	
}

function loginHandle(){
	var username = document.forms["login-form"]["username"].value;
	var password = document.forms["login-form"]["password"].value;
	var loginData = {
		"data": {
			"type": "MemberLogin",
			"attributes": {
				"username": username,
				"password": password
			}
		}
	}

	var xhr = new XMLHttpRequest();
	xhr.open("POST", LOGIN_API, true);		
	xhr.onreadystatechange = function() {		
		if(this.readyState === XMLHttpRequest.DONE) {
			var responseObject = JSON.parse(this.responseText);
			if(this.status === 200){
				localStorage.setItem("secretToken", responseObject.data.attributes.secretToken);
				localStorage.setItem("userId", responseObject.data.attributes.userId);
				alert("Đăng nhập thành công!");
				window.location.reload();
				if(confirm("Bạn có muốn thêm video không?")){
					window.location.href = "video-form.html";
				} else {
					window.location.href = "index.html";
				}
			} else {			
				document.getElementById("total-msg").classList = "error-msg";
				document.getElementById("total-msg").innerHTML = responseObject.errors[0].title + " " + responseObject.errors[0].detail;
			}									
		} 	  
	};
	xhr.send(JSON.stringify(loginData));
}