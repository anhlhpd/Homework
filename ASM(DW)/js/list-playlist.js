var PLAYLIST_API = "https://youtube-api-challenger.appspot.com/playlists";

var secretToken = localStorage.getItem("secretToken");
if(secretToken == null){
	alert("Bạn cần đăng nhập để sử dụng chức năng này!");
	window.location.href = "login.html";
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

function loadPlaylist(){	
	var xhr = new XMLHttpRequest();
	xhr.open("GET", PLAYLIST_API, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.setRequestHeader("Authorization", secretToken);
	xhr.onreadystatechange = function() {		
		if(this.readyState === XMLHttpRequest.DONE && this.status === 200) {
			var responseObject = JSON.parse(this.responseText);
			var htmlContent = "";
			if(responseObject == null || responseObject == undefined
				|| responseObject.data == undefined || responseObject.data == null
				|| responseObject.data.length <= 0){
				if(confirm("Hiện tại chưa có playlist nào, bạn có muốn thêm playlist?")){
					window.location.href = "playlist-form.html";	
				} else {
					window.location.href = "index.html";
				}		
			}

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
			document.getElementById("list-video").innerHTML = htmlContent;

			var addplaylist = document.getElementById("addplaylist");
				addplaylist.onclick = function(){
					window.location.href = "playlist-form.html";
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