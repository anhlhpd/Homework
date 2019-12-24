var VIDEO_API = "https://youtube-api-challenger.appspot.com/videos";
var MEMBER_API = "https://youtube-api-challenger.appspot.com/members";
var PLAYLIST_API = "https://youtube-api-challenger.appspot.com/playlists";

var secretToken = localStorage.getItem("secretToken");

var btnSubmit = document.getElementById("btnSubmit");

if(btnSubmit != null){
	btnSubmit.onclick = function(){
		saveVideo();		
	}
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
					var loggedInUsername = responseObject.data.attributes.username;
					// var userText = "Đăng nhập thành công với tài khoản " + loggedInUsername;
					// userText += '<a href="#" onclick="logoutHandle()">(Đăng xuất)</a>';
					// document.getElementById("welcome-user").innerHTML = userText;
					// document.getElementById("welcome-user").style = "display:block";
				} else {
					document.getElementById("total-msg").classList = "error-msg";
					document.getElementById("total-msg").innerHTML = responseObject.errors[0].title + " " + responseObject.errors[0].detail;
				}									
			} 	  
		};
		xhr.send();
	} else {
		console.log("Chưa đăng nhập.");
		document.getElementById("login-fieldset").style = "display:block;";
	}
}

loadUserInfor();

function saveVideo(){
	var youtubeId = document.forms["video-form"]["youtubeId"].value;
	var name = document.forms["video-form"]["name"].value;
	var description = document.forms["video-form"]["description"].value;
	var keywords = document.forms["video-form"]["keywords"].value;
	var playlistId = document.forms["video-form"]["playlistId"].value;
	var thumbnail = document.forms["video-form"]["thumbnail"].value;

	var videoData = {
		"data": {
			"type": "Video",
			"attributes": {
			 	"youtubeId": youtubeId,
		        "name": name,
		        "description": description,
		        "keywords": keywords,
		        "playlistId": playlistId,
		        "thumbnail": thumbnail
			}
		}
	}

	var xhr = new XMLHttpRequest();
	xhr.open("POST", VIDEO_API, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.setRequestHeader("Authorization", secretToken);
	xhr.onreadystatechange = function() {		
		if(this.readyState === XMLHttpRequest.DONE && this.status === 201) {
			var responseObject = JSON.parse(this.responseText);
			document.getElementById("total-msg").classList = "success-msg";
			document.getElementById("total-msg").innerHTML = "Lưu video thành công.";			
			document.forms["video-form"]["reset"].click();
			window.location.href = "video.html";
		} else {
			if(this.readyState === XMLHttpRequest.DONE){
				var responseObject = JSON.parse(this.responseText);
				document.getElementById("total-msg").classList = "error-msg";
				document.getElementById("total-msg").innerHTML = responseObject.errors[0].title + " " + responseObject.errors[0].detail;
			}			
		}	  
	};
	xhr.send(JSON.stringify(videoData));
}

function loadPlaylist(){	
	var xhr = new XMLHttpRequest();
	xhr.open("GET", PLAYLIST_API, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	// Nhét key vào header.
	xhr.setRequestHeader("Authorization", secretToken);
	xhr.onreadystatechange = function() {		
		if(this.readyState === XMLHttpRequest.DONE && this.status === 200) {
			var responseObject = JSON.parse(this.responseText);				
			if(responseObject == null || responseObject = undefined
			|| responseObject.data == null || responseObject.data == undefined
			|| responseObject.data.length <= 0){
				if(confirm("Hiện tại chưa có playlist nào, bạn có muốn thêm playlist?")){
					window.location.href = "playlist-form.html";	
				}				
			}

			var playlistBox = document.forms["video-form"]["playlistId"];
			var selectBoxContent = "";
			selectBoxContent += '<option value="0">All</option>';
			for (var i = 0; i < responseObject.data.length; i++) {
				var id = responseObject.data[i].id;				
				var name = responseObject.data[i].attributes.name;				
				selectBoxContent += '<option value="' + id + '">' + name + '</option>';
			}
			playlistBox.innerHTML = selectBoxContent 	;
		} else {
			if(this.readyState === XMLHttpRequest.DONE){
				var responseObject = JSON.parse(this.responseText);
				alert(responseObject.errors[0].title + " " + responseObject.errors[0].detail);
			}			
		}	  
	};
	xhr.send();
}

loadPlaylist();

function showForm(){
	var xhr = new XMLHttpRequest;
	xhr.open("GET", VIDEO_API, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.setRequestHeader("Authorization", secretToken);

	xhr.onreadystatechange = function(){
		if (this.readyState == 4 && this.status == 200) {
			console.log(this.responseText);
			var responseObject = JSON.parse(this.responseText);
			document.getElementById("total-msg").classList = "success-msg";
			document.getElementById("total-msg").innerHTML = "Lưu video thành công.";			
			document.forms["video-form"]["reset"].click();
			window.location.href = "video.html";
		} else {
			if(this.readyState === XMLHttpRequest.DONE){
				var responseObject = JSON.parse(this.responseText);
				document.getElementById("total-msg").classList = "error-msg";
				document.getElementById("total-msg").innerHTML = responseObject.errors[0].title + " " + responseObject.errors[0].detail;
			}
		}
	}
	xhr.send();
}