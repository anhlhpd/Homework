var PLAYLIST_API = "https://youtube-api-challenger.appspot.com/playlists";

var secretToken = localStorage.getItem("secretToken");

var btnSubmit = document.getElementById("btnSubmit");

if(btnSubmit != null){
	btnSubmit.onclick = function(){
		savePlaylist();		
	}
}

function savePlaylist(){

	var name = document.forms["playlist-form"]["name"].value;
	var description = document.forms["playlist-form"]["description"].value;
	var thumbnailUrl = document.forms["playlist-form"]["thumbnailUrl"].value;	

	var playlistData = {
		"data": {
			"type": "Video",
			"attributes": {			 	
		        "name": name,
		        "description": description,		        
		        "thumbnailUrl": thumbnailUrl
			}
		}
	}

	var xhr = new XMLHttpRequest();
	xhr.open("POST", PLAYLIST_API, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.setRequestHeader("Authorization", secretToken);
	xhr.onreadystatechange = function() {		
		if(this.readyState === XMLHttpRequest.DONE && this.status === 201) {
			var responseObject = JSON.parse(this.responseText);						
			document.getElementById("total-msg").classList = "success-msg";
			document.getElementById("total-msg").innerHTML = "Lưu Playlist thành công.";			
			document.forms["playlist-form"]["reset"].click();
			window.location.href = "list-playlist.html";
		} else {
			if(this.readyState === XMLHttpRequest.DONE){
				var responseObject = JSON.parse(this.responseText);
				document.getElementById("total-msg").classList = "error-msg";
				document.getElementById("total-msg").innerHTML = responseObject.errors[0].title + " " + responseObject.errors[0].detail;
			}			
		}	  
	};
	xhr.send(JSON.stringify(playlistData));
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