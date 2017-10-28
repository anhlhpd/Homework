var btnLogin = document.getElementById("btnLogin");
var usernameInput = document.forms["login-form"].elements["username"];
var passwordInput = document.getElementById("password");
var repasswordInput = document.getElementById("repassword");
var checkbox = document.forms["login-form"].elements["checkbox"];

var isValidUsername = false;
var isValidPassword = false;
var isValidrePassword = false;
var isValidCheckbox = false;

usernameInput.onkeyup = function(){
	checkValidUsername();
}

passwordInput.onkeyup = function(){
	checkValidPassword();
}

repasswordInput.onkeyup = function(){
	checkValidrePassword();
}

btnLogin.onclick = function(){
	checkcheckbox();
}

btnLogin.onclick = function(){		
	return (isValidUsername && isValidPassword && isValidrePassword && isValidCheckbox);
}

function checkValidUsername(){	
	var spanMsg = usernameInput.nextElementSibling;
	if (usernameInput != null && usernameInput.length == 1){
	if (usernameInput.value.length == 0){
		spanMsg.classList = "error-msg";
		spanMsg.innerHTML = "*Vui lòng nhập username.";				
		isValidUsername = false;
	} else{
		if (usernameInput.value.length < 8){
			spanMsg.classList = "error-msg";
			spanMsg.innerHTML = "*Username quá ngắn";
			isValidUsername = false;
		} else {
			spanMsg.classList = "success-msg";
			spanMsg.innerHTML = "Ok.";
			isValidUsername = true;
		}
	}
}}

function checkValidPassword(){	
	var spanPasswordMsg = passwordInput.nextElementSibling;	
	if (passwordInput.value.length == 0){
		spanPasswordMsg.classList = "error-msg";
		spanPasswordMsg.innerHTML = "*Vui lòng nhập password.";
		isValidPassword = false;
	} else{
		if (passwordInput.value.length < 8){
			spanPasswordMsg.classList = "error-msg";
			spanPasswordMsg.innerHTML = "*Password quá ngắn";
			isValidPassword = false;
		} else {
			spanPasswordMsg.classList = "success-msg";
			spanPasswordMsg.innerHTML = "Ok.";
			isValidPassword = true;
		}	
	}
}

function checkValidrePassword(){	
	var spanrePasswordMsg = repasswordInput.nextElementSibling;	
	if (repasswordInput.value.length == 0 || repasswordInput.value.length != passwordInput.value.length){
		spanrePasswordMsg.classList = "error-msg";
		spanrePasswordMsg.innerHTML = "*Vui lòng nhập lại password.";
		isValidrePassword = false;
	} else {
		spanrePasswordMsg.classList = "success-msg";
		spanrePasswordMsg.innerHTML = "Ok.";
		isValidrePassword = true;
	} 
}

function checkcheckbox(){
	if(!checkbox.checked){
		isValidCheckbox = false;
	} else {
		isValidCheckbox = true;
	}
}

var AUTHENTICATION_URL = "https://youtube-api-challenger2.appspot.com/authentication";
var btnRegister = document.forms["login-form"].elements["btnLogin"];
btnRegister.onclick = function(){
	var data = {
		"data": {
			"type": "MemberLogin",
			"attributes": {
				"username": "xuanhung2401";
				"password": "123456";
			}
		}
	}
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if (this.readyState == 4 && this.status == 200){
			document.body.innerHTML = this.responseText;
		}
	};
	xhttp.open("POST",AUTHENTICATION_URL,true);
	xhttp.send(JSON.stringify(data));
}