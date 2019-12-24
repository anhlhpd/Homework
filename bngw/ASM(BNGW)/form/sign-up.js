var btnLogin = document.getElementById("btnLogin");
var usernameInput = document.forms["login-form"].elements["username"];
var passwordInput = document.getElementById("password");
var repasswordInput = document.getElementById("repassword");
var fullname = document.getElementById("name");
var email = document.getElementById("email");
var birthday = document.getElementById("birthday");
var gender = document.forms["login-form"].elements["gender"];
var checkbox = document.forms["login-form"].elements["checkbox"];

var isValidUsername = false;
var isValidPassword = false;
var isValidrePassword = false;
var isEmail = false;

usernameInput.onkeyup = function(){
	checkValidUsername();
}

passwordInput.onkeyup = function(){
	checkValidPassword();
}

repasswordInput.onkeyup = function(){
	checkValidrePassword();
}

email.onkeyup = function(){
	checkMail();
}

btnLogin.onclick = function(){		
	return (isValidUsername && isValidPassword && isValidrePassword);
}

function checkValidUsername(){	
	var spanMsg = usernameInput.nextElementSibling;
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
			spanMsg.innerHTML = "Hợp lệ.";
			isValidUsername = true;
		}
	}
}

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
			spanPasswordMsg.innerHTML = "Hợp lệ.";
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
	} else if (repasswordInput.value != passwordInput.value) {
		spanrePasswordMsg.classList = "error-msg";
		spanrePasswordMsg.innerHTML = "*Nhập sai password.";
		isValidrePassword = false;
	} else {
		spanrePasswordMsg.classList = "success-msg";
		spanrePasswordMsg.innerHTML = "Hợp lệ.";
		isValidrePassword = true;
	} 
}

function checkMail(){	
	var spanMailMsg = email.nextElementSibling;	
	if (email.value.length == 0){
		spanMailMsg.classList = "error-msg";
		spanMailMsg.innerHTML = "*Vui lòng nhập email.";
		isEmail = false;
	} else{
			spanMailMsg.classList = "success-msg";
			spanMailMsg.innerHTML = "Hợp lệ.";
			isEmail = true;
		}	
}

var URL = "https://youtube-api-challenger2.appspot.com/members/register";
btnLogin.onclick = function(){
	var data = {
		"data": {
			"type": "MemberLogin",
			"attributes": {
				"username": usernameInput.value,
				"password": passwordInput.value,
				"fullName": fullname.value,
				"email": email.value,
				"birthDay": birthday.value,
				"gender": gender.value
			}
		}
	}
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if (this.readyState == 4 && this.status == 200){
			document.fieldset.innerHTML = this.responseText;
		}
	};
	xhr.open("POST",URL,true);
	xhr.send(JSON.stringify(data));
}