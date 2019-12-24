var MEMBER_API = "https://youtube-api-challenger.appspot.com/members";

var spanTotalMessage = document.getElementById("total-msg");
var btnSubmit = document.getElementById("btnSubmit");

if(btnSubmit != null){
	btnSubmit.onclick = function(){
		if(validateForm()){
			register();
		}
	}	
}

function validateForm(){
	var isValidUsername = true;
	var isValidPassword = true;
	var isValidRepassword = true;
	var isValidFullName = true;
	var isValidEmail = true;
	var isValidbirthDay = true;

	var usernameInput = document.forms["member"]["username"];
	var username = usernameInput.value;
	if (username.length == 0){
		isValidUsername = false;
		usernameInput.nextElementSibling.classList = "error-msg";
		usernameInput.nextElementSibling.innerHTML = "Vui lòng nhập thông tin tài khoản!";
	} else if (username.length < 7){
		isValidUsername = false;
		usernameInput.nextElementSibling.classList = "error-msg";
		usernameInput.nextElementSibling.innerHTML = "Thông tin tài khoản phải dài hơn 7 ký tự!";
	} else {
		isValidUsername = true;
		usernameInput.nextElementSibling.innerHTML = "";
	}

	var passwordInput = document.forms["member"]["password"];
	var password = passwordInput.value;
	if (password.length == 0){
		isValidPassword = false;
		passwordInput.nextElementSibling.classList = "error-msg";
		passwordInput.nextElementSibling.innerHTML = "Vui lòng nhập thông tin mật khẩu!";
	} else if (password.length < 7){
		isValidPassword = false;
		passwordInput.nextElementSibling.classList = "error-msg";
		passwordInput.nextElementSibling.innerHTML = "Thông tin mật khẩu phải dài hơn 7 ký tự!";
	} else {
		isValidPassword = true;
		passwordInput.nextElementSibling.innerHTML = "";
	}

	var rePasswordInput = document.forms["member"]["re-password"];
	var rePassword = rePasswordInput.value;
	if(rePassword !== password){
		isValidRepassword = false;
		rePasswordInput.nextElementSibling.classList = "error-msg";
		rePasswordInput.nextElementSibling.innerHTML = "Mật khẩu không khớp!";
	} else {
		isValidRepassword = true;
		rePasswordInput.nextElementSibling.classList = "error-msg";
		rePasswordInput.nextElementSibling.innerHTML = "";
	}

	var fullNameInput = document.forms["member"]["fullName"];
	var fullName = fullNameInput.value;
	if (fullName.length == 0){
		isValidFullName = false;
		fullNameInput.nextElementSibling.classList = "error-msg";
		fullNameInput.nextElementSibling.innerHTML = "Vui lòng nhập họ và tên!";
	} else if (fullName.length < 7){
		isValidFullName = false;
		fullNameInput.nextElementSibling.classList = "error-msg";
		fullNameInput.nextElementSibling.innerHTML = "Họ và tên phải dài hơn 7 ký tự!";
	} else {
		isValidFullName = true;
		fullNameInput.nextElementSibling.innerHTML = "";
	}

	var emailInput = document.forms["member"]["email"];
	var email = emailInput.value;
	if (email.length == 0){
		isValidEmail = false;
		emailInput.nextElementSibling.classList = "error-msg";
		emailInput.nextElementSibling.innerHTML = "Vui lòng điền email!";
	} else if (email.length < 7){
		isValidEmail = false;
		emailInput.nextElementSibling.classList = "error-msg";
		emailInput.nextElementSibling.innerHTML = "Email phải dài hơn 7 ký tự!";
	} else {
		isValidEmail = true;
		emailInput.nextElementSibling.innerHTML = "";
	}

	var birthDayInput = document.forms["member"]["birthDay"];
	if (birthDayInput.value == 0) {
		isValidbirthDay = false;
		birthDayInput.nextElementSibling.classList = "error-msg";
		birthDayInput.nextElementSibling.innerHTML = "Vui lòng chọn ngày sinh!";
	} else {
		isValidbirthDay = true;
		birthDayInput.nextElementSibling.innerHTML = "";
	}

	if(isValidUsername 
		&& isValidPassword 
		&& isValidRepassword 
		&& isValidFullName 
		&& isValidEmail
		&& isValidbirthDay){

		var member = {
			"data": {
				"type": "Member",
				"attributes": {
					"username": username,
					"password": password,
			        "fullName": fullName,
			        "email": email,
			        "birthDay": new Date (document.getElementById("birthDay").value).getTime(),
			        "gender":1
				}
			}
		}
		register(member);
	} else {
		spanTotalMessage.innerHTML = "Vui lòng sửa các lỗi bên dưới trước khi submit form.";
	}
}

function register(member){
	var xhr = new XMLHttpRequest();
	xhr.open("POST", MEMBER_API, true);
	xhr.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 201){
			var spansError = document.getElementsByClassName("error-msg");
			for (var i = 0; i < spansError.length; i++) {
				spansError[i].innerHTML = "";
			}
			spanTotalMessage.classList = "success-msg";
			spanTotalMessage.innerHTML = "Đăng ký thành công.";
			window.location.herf = "login.html";
			document.forms["member"]["reset"].click();
			window.location.herf = "video.html";
		} else if(this.readyState == 4){
			var spansError = document.getElementsByClassName("error-msg");
			for (var i = 0; i < spansError.length; i++) {
				spansError[i].innerHTML = "";
			}
			spanTotalMessage.classList = "error-msg";
			var responseObject = JSON.parse(this.responseText);
			spanTotalMessage.innerHTML = responseObject.errors[0].title + " " + responseObject.errors[0].detail;
		}
	};
	xhr.send(JSON.stringify(member));	
}

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