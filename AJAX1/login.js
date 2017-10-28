var AUTHENTICATION_URL = "https://youtube-api-challenger2.appspot.com/authentication";

var btnRegister = document.getElementById("btnLogin");
btnRegister.onclick = function(){
	var data = {
		"data": {
			"type": "MemberLogin",
			"attributes": {
				"username": "xuanhung2401",
				"password": "1234567"
			}
		}
	};

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){		
		if (this.readyState == 4 && this.status == 200){			
			document.body.innerHTML = this.responseText;
		}
	};
	xhttp.open("POST",AUTHENTICATION_URL,true);
	xhttp.send(JSON.stringify(data));	
};