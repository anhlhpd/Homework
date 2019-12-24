document.addEventListener("DOMContentLoaded", function(event) {    
	var inputSearch = document.getElementById("keyword");
	inputSearch.onkeydown = function(event){
		if (event.keyCode == 13){
			loadVideo(this.value);
		}
	}
	loadVideo("anime amv");
});

var secretToken = localStorage.getItem("secretToken");
var modal = document.getElementById('myModal');

var span = document.getElementsByClassName("close");

var videoFrame = document.getElementById("video-frame");

span.onclick = function() {
    closeVideo();
}

window.onclick = function(event) {
    if (event.target == modal) {
        closeVideo();
    }
}	

function loadVideo(keyword){
	var YOUTUBE_API = "https://content.googleapis.com/youtube/v3/search?q=" + keyword + "&type=video&videoEmbeddable=true&videoSyndicated=true&maxResults=9&part=snippet&key=AIzaSyAwUjk3CwtXCiB_W6Xi0colfOKPgm90hHc";
	var xhr = new XMLHttpRequest();
	xhr.open("GET", YOUTUBE_API, true);
	xhr.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			var responseJson = JSON.parse(this.responseText);
			var htmlContent = "";
			
			for (var i = 0; i < responseJson.items.length; i++) {
				if(responseJson.items[i].id.kind == 'youtube#channel'){
					continue;
				}
				var videoId = responseJson.items[i].id.videoId;
				var videoTitle = responseJson.items[i].snippet.title;
				var videoDescription = responseJson.items[i].snippet.description;
				var videoThumbnail = responseJson.items[i].snippet.thumbnails.medium.url;
					
				htmlContent += '<div class="video" onclick="showVideo(\'' + videoId + '\')">'
					htmlContent += '<img src="' + videoThumbnail + '">'
					htmlContent += '<div class="title">' + videoTitle + '</div>'
				htmlContent += '</div>'
			}
			document.getElementById("list-video").innerHTML = htmlContent;
		} else if(this.readyState == 4){
			console.log("Fails");
		}
	};
	xhr.send();
}

loadVideo();

function closeVideo(){
	modal.style.display = "none";    
    videoFrame.src = "";
}

function showVideo(videoId){		
	videoFrame.src = "https://www.youtube.com/embed/" + videoId + "?autoplay=1";
	setTimeout(function(){ 
		modal.style.display = "block";
	}, 300);	
}

var MEMBER_API = "https://youtube-api-challenger.appspot.com/members";

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
					logout.style = "display: block;";
					logout.onclick = function(){
						logoutHandle();
					}
					var main = document.getElementById("main");
					main.style = "display: none;";
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

function logoutHandle(){	
	if(confirm("Bạn có chắc muốn đăng xuất không?")){
		localStorage.removeItem("secretToken");
		localStorage.removeItem("userId");
		alert("Logged out!");
		window.location.reload();
	}	
}