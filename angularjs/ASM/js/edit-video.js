var VIDEO_API = "https://youtube-api-challenger.appspot.com/videos";

var secretToken = localStorage.getItem("secretToken");

function loadVideo(id){
	var xhr = new XMLHttpRequest();
	xhr.open("GET", VIDEO_API + "/" + id, true);
	xhr.setRequestHeader("Authorization", secretToken);
	xhr.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			var responseJson = JSON.parse(this.responseText);
			console.log(responseJson);
			var id = responseJson.data.id;
			var name = responseJson.data.attributes.name;
			var youtubeId = responseJson.data.attributes.youtubeId;
			var description = responseJson.data.attributes.description;
			var keywords = responseJson.data.attributes.keywords;
			var thumbnail = responseJson.data.attributes.thumbnail;

			document.forms["video-form"]["id"].value = id;
			document.forms["video-form"]["keywords"].value = keywords;
			document.forms["video-form"]["thumbnail"].value = thumbnail;
			document.forms["video-form"]["youtubeId"].value = youtubeId;
			document.forms["video-form"]["name"].value = name;
			document.forms["video-form"]["description"].value = description;
		}
	};
	xhr.send();
}

loadVideo(getParameterByName("id"));

var btnSubmit = document.getElementById("btnSubmit");
btnSubmit.onclick = function(){
	updateVideo();
};

function updateVideo(){
	var id = document.forms["video-form"]["id"].value;
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
	xhr.open("PUT", VIDEO_API + "/" + id, true);
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

function getParameterByName(name) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
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