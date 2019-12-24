var VIDEO_API = "https://youtube-api-challenger.appspot.com/videos";
var PLAYLIST_API = "https://youtube-api-challenger.appspot.com/playlists";

var secretToken = localStorage.getItem("secretToken");
if(secretToken == null){
	alert("Bạn cần đăng nhập để sử dụng chức năng này!");
	window.location.href = "login.html";
}

function loadPlaylist(){	
	var xhr = new XMLHttpRequest();
	xhr.open("GET", PLAYLIST_API, true);
	xhr.setRequestHeader("Content-Type", "application/json")
	xhr.setRequestHeader("Authorization", secretToken);
	xhr.onreadystatechange = function() {		
		if(this.readyState === XMLHttpRequest.DONE && this.status === 200) {
			var responseObject = JSON.parse(this.responseText);	
			var hasPl = true;
			var htmlContent = "";
			if(responseObject == null  || responseObject == undefined 
				|| responseObject.data == null 
				|| responseObject.data == undefined 
				|| responseObject.data.length <= 0){
				hasPl = false;
				if(confirm("Hiện tại chưa có playlist nào, bạn có muốn thêm playlist?")){
					window.location.href = "playlist-form.html";	
				} else {
					window.location.href = "video.html";
				}		
			}
			if(hasPl){
				for (var i = 0; i < responseObject.data.length; i++) {
					var id = responseObject.data[i].id;				
					var name = responseObject.data[i].attributes.name;
					var thumbnail = responseObject.data[i].attributes.thumbnailUrl;	
					htmlContent += '<div class="video">';
					htmlContent += '<a href="my-index.html?playlistId=' + id + '" target="_blank">';
					htmlContent += '<img src="' + thumbnail + '">';
					htmlContent += '</a>';
					htmlContent +=	'<div class="action">';
					htmlContent +=		'<span class="title">' + name + '</span>&nbsp;';
					htmlContent +=		'<div><span><a href="edit-video.html?id=' + id + '"><img class="icon" src = "https://cdn1.iconfinder.com/data/icons/flat-web-browser/100/edit-button-512.png"></a></span>&nbsp;';
					htmlContent +=		'<span><a href="#" onclick="deletePlaylist(\'' + id + '\')"><img class="icon" src = "https://cdn4.iconfinder.com/data/icons/status-1/128/Status_check_mark_no_thick_bold-512.png"></a></span></div>';
					htmlContent += '</div>';
				htmlContent += '</div>';					
				}
				htmlContent += '<div><input type="button" value="Thêm playlist" class="more" id="addplaylist"></div>';
				document.getElementById("list-video").innerHTML += htmlContent;
			}
			if(hasPl){
				for (var i = 0; i < responseObject.data.length; i++) {
					var id = responseObject.data[i].id;				
					var name = responseObject.data[i].attributes.name;
					loadVideoByPlaylist(id, name);	
				}				
			}
			
		} else {
			if(this.readyState === XMLHttpRequest.DONE){
				var responseObject = JSON.parse(this.responseText);
				alert(responseObject.errors[0].title + " " + responseObject.errors[0].detail);
			}			
		}	  
	};
	xhr.send();
}

function loadVideoByPlaylist(plId, plName){	
	var xhr = new XMLHttpRequest();
	xhr.open("GET", VIDEO_API + "?playlist=" + plId, true);
	xhr.setRequestHeader("Authorization", secretToken);
	xhr.onreadystatechange = function() {
		if(this.readyState === XMLHttpRequest.DONE && this.status === 200) {
			var responseObject = JSON.parse(this.responseText);
			var hasContent = true;
			var htmlContent = "";
			if(responseObject == null || responseObject == undefined 
				|| responseObject.data == null || responseObject.data == undefined 
				|| responseObject.data.length <= 0){
				hasContent = false;
				if(confirm("Trong playlist chưa có video nào. Bạn có muốn thêm video?")){
					window.location.href = "video-form.html";
				} else {
					window.location.href = "list-playlist.html";
				}
			}
			
			if(hasContent){				
				for (var i = 0; i < responseObject.data.length; i++) {
					var id = responseObject.data[i].id;
					var videoId = responseObject.data[i].attributes.youtubeId;
					var videoTitle = responseObject.data[i].attributes.name;
					var videoThumbnail = responseObject.data[i].attributes.thumbnail;
					htmlContent += '<div class="video-playlist">';
						htmlContent += '<img src="' + videoThumbnail + '">';					
						htmlContent +=	'<div class="action">';
						htmlContent +=		'<span class="title">' + videoTitle + '</span>&nbsp;';					
						htmlContent += '</div>';
					htmlContent += '</div>';				
				}
				document.getElementById("playlist-" + plId).innerHTML += htmlContent;
				document.getElementById("playlist-" + plId).style = "display:block";
			}						
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

function getParameterByName(name) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function deletePlaylist(id){
	if(confirm("Bạn có chắc chắn muốn xoá playlist này không?")){
		var xhr = new XMLHttpRequest();
		xhr.open("DELETE", PLAYLIST_API + "/" + id, true);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.setRequestHeader("Authorization", secretToken);
		xhr.onreadystatechange = function() {		
			if(this.readyState === XMLHttpRequest.DONE && this.status === 200) {
				console.log(this.responseText);
				var responseObject = JSON.parse(this.responseText);	
				alert("Xoá thành công");
				window.location.reload();
			} else {
				if(this.readyState === XMLHttpRequest.DONE){
					var responseObject = JSON.parse(this.responseText);
					alert(responseObject.errors[0].title + " " + responseObject.errors[0].detail);
				}			
			}	  
		};
		xhr.send();	
	}
}

function updatePlaylist(){
	var id = document.forms["playlist-form"]["id"].value;
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
	xhr.open("PUT", PLAYLIST_API + "/" + id, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.setRequestHeader("Authorization", secretToken);
	xhr.onreadystatechange = function() {		
		if(this.readyState === XMLHttpRequest.DONE && this.status === 201) {
			var responseObject = JSON.parse(this.responseText);						
			document.getElementById("total-msg").classList = "success-msg";
			document.getElementById("total-msg").innerHTML = "Lưu playlist thành công.";			
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