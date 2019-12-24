var VIDEO_API = "https://youtube-api-challenger.appspot.com/videos";

var playlistId = getParameterByName("playlistId");
if(playlistId != null){
	VIDEO_API += '?playlist=' + playlistId;
}

var secretToken = localStorage.getItem("secretToken");
if(secretToken == null){
	alert("Bạn cần đăng nhập để sử dụng chức năng này!");
	window.location.href = "login.html";
}

var modalVideo = document.getElementById('myModal');
var modalVideoForm = document.getElementById('video-modal');

var spanVideo = document.getElementById("close-video");

var videoFrame = document.getElementById("video-frame");

spanVideo.onclick = function() {
    closeVideo();
}

window.onclick = function(event) {
    if (event.target == modalVideo) {
        closeVideo();        
    } else if(event.target == modalVideoForm){
    	closeForm();
    }
}	

function closeVideo(){
	modalVideo.style.display = "none";    
    videoFrame.src = "";
}

function closeForm(){
	modalVideoForm.style.display = "none";        
}

function showVideo(videoId){		
	videoFrame.src = "https://www.youtube.com/embed/" + videoId + "?autoplay=1";
	setTimeout(function(){ 
		modalVideo.style.display = "block";
	}, 300);
}

function showForm(videoId){	
	var xhr = new XMLHttpRequest();
	xhr.open("GET", VIDEO_API + "/" + videoId, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.setRequestHeader("Authorization", secretToken);
	xhr.onreadystatechange = function() {		
		if(this.readyState === XMLHttpRequest.DONE && this.status === 200) {
			console.log(this.responseText);
			var responseObject = JSON.parse(this.responseText);	
			var youtubeId = responseObject.data.attributes.youtubeId;
			var name = responseObject.data.attributes.name;
			var thumbnail = responseObject.data.attributes.thumbnail;
			var keywords = responseObject.data.attributes.keywords;
			var description = responseObject.data.attributes.description;

			document.forms["video-form"]["youtubeId"].value = youtubeId;
			document.forms["video-form"]["youtubeId"].disabled = true;
			document.forms["video-form"]["name"].value = name;
			document.forms["video-form"]["description"].value = description;
			document.forms["video-form"]["keywords"].value = keywords;
			document.forms["video-form"]["thumbnail"].value = thumbnail;
			setTimeout(function(){				
				modalVideoForm.style.display = "block";
			}, 300);	
		} else {
			if(this.readyState === XMLHttpRequest.DONE){
				var responseObject = JSON.parse(this.responseText);
				alert(responseObject.errors[0].title + " " + responseObject.errors[0].detail);
			}			
		}	  
	};
	xhr.send();	
}

function deleteVideo(id){
	if(confirm("Bạn có chắc chắn muốn xoá video này không?")){
		var xhr = new XMLHttpRequest();
		xhr.open("DELETE", VIDEO_API + "/" + id, true);
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

function loadVideo(){	
	var xhr = new XMLHttpRequest();
	xhr.open("GET", VIDEO_API, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.setRequestHeader("Authorization", secretToken);
	xhr.onreadystatechange = function() {		
		if(this.readyState === XMLHttpRequest.DONE && this.status === 200) {
			var responseObject = JSON.parse(this.responseText);	
			var htmlContent = "";
			if(responseObject == null || responseObject.data == null || responseObject.data.length <= 0){
				if(confirm("Hiện tại chưa có video nào, bạn có muốn thêm video?")){
					window.location.href = "video-form.html";	
				}				
			}
			for (var i = 0; i < responseObject.data.length; i++) {
				var id = responseObject.data[i].id;
				var videoId = responseObject.data[i].attributes.youtubeId;
				var videoTitle = responseObject.data[i].attributes.name;
				var videoThumbnail = responseObject.data[i].attributes.thumbnail;
				htmlContent += '<div class="video">';
					htmlContent += '<img src="' + videoThumbnail + '" onclick="showVideo(\'' + videoId + '\')">';					
					htmlContent +=	'<div class="action">';
					htmlContent +=		'<span onclick="showVideo(\'' + videoId + '\')" class="title">' + videoTitle + '</span>&nbsp;';
					htmlContent +=		'<div><span><a href="edit-video.html?id=' + id + '"><img class="icon" src = "https://cdn1.iconfinder.com/data/icons/flat-web-browser/100/edit-button-512.png"></a></span>&nbsp;';
					htmlContent +=		'<span><a href="#" onclick="deleteVideo(\'' + id + '\')"><img class="icon" src = "https://cdn4.iconfinder.com/data/icons/status-1/128/Status_check_mark_no_thick_bold-512.png"></a></span></div>';
					htmlContent += '</div>';
				htmlContent += '</div>';
			}
			htmlContent += '<div><input type="button" value="Thêm video" class="more" id="addvideo"></div>';
			document.getElementById("list-video").innerHTML = htmlContent;
			var addvideo = document.getElementById("addvideo");
				addvideo.onclick = function(){
					window.location.href = "video-form.html";
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

loadVideo();

function getParameterByName(name) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}