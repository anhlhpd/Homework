var btnLogin = document.getElementById("btnLogin");
var usernameInput = document.getElementById("username");
var passwordInput = document.getElementById("password");

var isValidUsername = false;
var isValidPassword = false;

usernameInput.onkeyup = function(){
	checkValidUsername();
}

passwordInput.onkeyup = function(){
	checkValidPassword();
}

btnLogin.onclick = function(){		
	return (isValidUsername && isValidPassword);
}

function checkValidUsername(){	
	var spanMsg = usernameInput.nextElementSibling;
	if (usernameInput.value.length == 0){
		spanMsg.classList = "error-msg";
		spanMsg.innerHTML = "*Vui lòng nhập username.";				
		isValidUsername = false;
	} else {
			spanMsg.classList = "success-msg";
			spanMsg.innerHTML = "Ok.";
			isValidUsername = true;
		}
	
}

function checkValidPassword(){	
	var spanPasswordMsg = passwordInput.nextElementSibling;	
	if (passwordInput.value.length == 0){
		spanPasswordMsg.classList = "error-msg";
		spanPasswordMsg.innerHTML = "*Vui lòng nhập password.";
		isValidPassword = false;
	} else{
		spanPasswordMsg.classList = "success-msg";
		spanPasswordMsg.innerHTML = "Ok.";
		isValidPassword = true;
		}	
}

var URL = "https://youtube-api-challenger2.appspot.com/authentication";
btnLogin.onclick = function(){
	var data = {
		"data": {
			"type": "MemberLogin",
			"attributes": {
				"username": usernameInput.value,
				"password": passwordInput.value
			}
		}
	}
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if (this.readyState == 4 && this.status == 200){
			document.main.innerHTML = this.responseText;
		}
	};
	xhr.open("POST",URL,true);
	xhr.send(JSON.stringify(data));
}