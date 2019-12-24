LOGIN_API = "https://youtube-api-challenger.appspot.com/authentication";
var userId = localStorage.getItem("userId");
var secretToken = localStorage.getItem("secretToken");

$(document).ready(function(){
	loadMemberInfo();

	// Đăng ký
	$("[name='btn-register']").click(function() {
		var day = new Date($('#birthDay').val()); 
		var data = {
			"data": {
				"type": "Member",
				"attributes": {
					"username": $('#usernameInput').val(),
					"password": $('#passwordInput').val(),
					"fullName": $('#fullnameInput').val(),
					"email": $('#emailInput').val(),
					"birthDay": day.getTime(),
					"gender":$('#gender').val(),
				}
			}
		};
		if (validateRegisterData()) {
			saveMember(data,"POST");
		}
		
	});
	
	// Đăng nhập
	$("#btnLogin").click(function(){
		
		if (validateLoginData()) {
			var data = {
				"data": {
					"type": "MemberLogin",
					"attributes": {
						"username": $("[name='loginUsername']").val(),
						"password": $("[name='loginPassword']").val()
					}
				}
			}
			loginHandle(data);
		}		
	});

	$('#sign-in').keypress(function(e) {
		if (e.which == 13) {
			
			if (validateLoginData()) {
				var data = {
					"data": {
						"type": "MemberLogin",
						"attributes": {
							"username": $("[name='loginUsername']").val(),
							"password": $("[name='loginPassword']").val()
						}
					}
				}
				loginHandle(data);
			}
		}
	});
	
	// Đăng xuất
	$("#logOut").click(function(){
		logoutHandle();
	});
	
	//Lấy thông tin người dùng
	$('#infoMember').click(function(){
		var secretToken = localStorage.getItem("secretToken");
		var userId = localStorage.getItem("userId");
		loadCurrentMember(secretToken,userId);
	});

	$('[name="btn-update"]').click(function(){
		var day = new Date($('[name="birtDayInfo"]').val()); 
		var data = {
			"data": {
				"type": "Member",
				"attributes": {
					"username": $('[name="nameInfo"]').val(),
					"password": $('[name="passwordInfo"]').val(),
					"fullName": $('[name="fullNameInfo"]').val(),
					"email": $('[name="emailInfo"]').val(),
					"birthDay": day.getTime(),
					"gender":$('[name="genderInfo"]').val(),
				}
			}
		};
		if (validateInfoData()) {
			saveMember(data,"PUT",userId);
		}
	});
	
	// Load video
	loadVideo("Anime AMV");
	
	$('.btnSearch').click(function() {
		
		loadVideo($('#searchInput').val());
	});
	$('#searchInput').keypress(function(e) {
		if (e.which == 13) {
			loadVideo($('#searchInput').val());
			return false;
		}
	});
});


// Đăng ký
var REGISTER_API = "https://youtube-api-challenger.appspot.com/members";

function saveMember(registerObject, method, memberId){
	var url = REGISTER_API;
	if (method === "PUT"){
		url += "/" + memberId;
	}
	$.ajax({
		url: url,
		type: method,
		data: JSON.stringify(registerObject),
		headers:{"Authorization":secretToken},
		success: function(response){
			console.log(response);
			if(method === "PUT"){
				alert("Lưu thông tin thành công");
			}
			$("#modalMember").modal("hide");
			loginHandle(response);
		},
		error: function(response, message){			
			var jsonObject = JSON.parse(response.responseText);
			var errorTitle = jsonObject.errors[0].title;
			var errorDetail = jsonObject.errors[0].detail;
			alert(errorDetail);			
		}
	});

}

// Validate đăng ký
function validateRegisterData(){
	// Validate username
	var isValidUsername = true;
	if ($("#usernameInput").val().length == 0 ) {
		$("#usernameInput").next().html("Vui lòng nhập username!");
		$("#usernameInput").next().addClass("error-msg");
		isValidUsername = false;
	}
	else if ($("#usernameInput").val().length < 7 ) {
		$("#usernameInput").next().html("Username phải có hơn 7 kí tự!");
		$("#usernameInput").next().addClass("error-msg");
		isValidUsername = false;
	} else{
		$("#usernameInput").next().html("");
		isValidUsername = true;
	}
	
	// Validate password
	var isValidPassword = true;
	if ($("#passwordInput").val().length == 0 ) {
		$("#passwordInput").next().html("Vui lòng nhập mật khẩu!");
		$("#passwordInput").next().addClass("error-msg");
		isValidPassword = false;
	}
	else if ($("#passwordInput").val().length < 7 ) {
		$("#passwordInput").next().html("Mật khẩu phải có hơn 7 kí tự!");
		$("#passwordInput").next().addClass("error-msg");
		isValidPassword = false;
	} else{
		$("#passwordInput").next().html("");
		isValidPassword = true;
	}

	// Validate rePassword
	var isValidrePassword = true;
	if ($("#saveRePassword").val().length == 0) {
		$("#saveRePassword").next().html("Vui lòng nhập lại mật khẩu!");
		$("#saveRePassword").next().addClass("error-msg");
		isValidrePassword = false;
	}
	else if ($("#saveRePassword").val() != $("#passwordInput").val()) {
		$("#saveRePassword").next().html("Mật khẩu không khớp!");
		$("#saveRePassword").next().addClass("error-msg");
		isValidrePassword = false;
	}
	else{
		$("#saveRePassword").next().css('color', 'green');
		isValidrePassword = true;
	}

	// Validate Email
	var isValidEmail = true;
	if ($("#emailInput").val().length == 0) {
		$("#emailInput").next().html("Vui lòng nhập email");
		$("#emailInput").next().addClass("error-msg");
		isValidEmail = false;
	}
	else{
		$("#emailInput").next().html("");
		isValidEmail = true;
	}

	// Validate fullname
	var isValidfullName = true;
	if ($("#fullnameInput").val().length == 0) {
		$("#fullnameInput").next().html("Vui lòng nhập họ tên!");
		$("#fullnameInput").next().addClass("error-msg");
		isValidfullName = false;
	}else if ($("#fullnameInput").val().length < 7) {
		$("#fullnameInput").next().html("Họ tên phải có hơn 7 kí tự!");
		$("#fullnameInput").next().addClass('error-msg');
	}
	else{
		$("#fullnameInput").next().html("");
		isValidfullName = true;
	}
	// Validate gender
	var isGender = true;
	if ($('[name="gender"]').val() == -1) {
		$('[name="gender"]').next().html("Vui lòng chọn giới tính!");
		$('[name="gender"]').next().addClass("error-msg");
		isGender = false;
	} else {
		$('[name="gender"]').next().html("");
		isGender = true
	}
	// Validate birtday
	var isbirthDay = true;
	if ($('#birthDay').val() == 0) {
		$('#birthDay').next().html("Vui lÃ²ng chá»n ngÃ y thÃ¡ng nÄƒm sinh");
		$('#birthDay').next().addClass("error-msg");		
		isbirthDay = false;
	} else {
		$('#birthDay').next().html("");
		isbirthDay = true;
	}

	if (!(isValidPassword && isValidEmail && isValidUsername && isValidUsername && isValidrePassword && isValidfullName && isGender && isbirthDay)) {
		return false;
	} else {
		return true;
	}

}

// Validate đăng nhập
function validateLoginData(){
	// Validate username
	var isValidUsername = true;
	if ($('input[name="loginUsername"]').val().length == 0) {
		$('input[name="loginUsername"]').next().html("Vui lòng nhập username");
		$('input[name="loginUsername"]').next().addClass("error-msg");
		isValidUsername = false;
	}
	else{
		$('input[name="loginUsername"]').next().html("");
		$('input[name="loginUsername"]').next().addClass("error-msg");
		isValidUsername = true;
	};

	// Validate password
	var isValidPassword = true;
	if ($('input[name="loginPassword"]').val().length == 0) {
		$('input[name="loginPassword"]').next().html("Vui lòng nhập mật khẩu!");
		$('input[name="loginPassword"]').next().addClass("error-msg");
		isValidPassword = false;
	}
	else{
		$('input[name="loginPassword"]').next().html("");
		$('input[name="loginPassword"]').next().addClass("error-msg");
		isValidPassword = true;
	};

	// Check validate
	if (!(isValidPassword && isValidUsername)) {
		return false;
	} else {
		return true;
	}
}

// Gửi thông tin login lên api. Trong trường hợp lỗi thì hiển thị thông báo
// cho người dùng. Trường hợp login thành công thì lưu secretToken, load thông tin người dùng.
function loginHandle(loginData){
	$.ajax({
		url: LOGIN_API,
		type: "POST",
		data: JSON.stringify(loginData),
		success : function(response){
			$(".ul1").removeClass("show");
			$(".ul1").addClass("hidden");
			$(".ul2").removeClass("hidden");
			$(".ul2").addClass("show");
			console.log(response);
			localStorage.setItem("secretToken", response.data.attributes.secretToken);
			localStorage.setItem("userId", response.data.attributes.userId );
			window.location.reload();
			loadMemberInfo();
		},
		error : function(response, msg){
			var jsonOb = JSON.parse(response.responseText);
			alert(jsonOb.errors[0].detail)
		}
	});

}

// Kiểm tra thông tin secretToken và userId, trong trường hợp chưa tồn tại thì yêu cầu 
// login, trường hợp tồn tại thì gọi API lấy thông tin người dùng.
function loadMemberInfo(){
	if (localStorage.getItem("secretToken") == null) {
		$('[data-target="#sign-up"]').addClass('show');
		$('[data-target="#sign-up"]').removeClass('hidden');
		$('[data-target="#sign-in"]').addClass('show');
		$('[data-target="#sign-in"]').removeClass('hidden');
		$('#infoMember').addClass('hidden');
		$('#infoMember').removeClass('show');
		$('#logOut').addClass('hidden');
		$('#logOut').removeClass('show');
	} else {
		$('[data-target="#sign-up"]').addClass('hidden');
		$('[data-target="#sign-up"]').removeClass('show');
		$('[data-target="#sign-in"]').addClass('hidden');
		$('[data-target="#sign-in"]').removeClass('show');
		$('#infoMember').addClass('show');
		$('#infoMember').removeClass('hidden');
		$('#logOut').addClass('show');
		$('#logOut').removeClass('hidden');
		$.ajax({
			url: REGISTER_API + "/" + userId,
			type: "GET",
			headers: { 'Authorization': secretToken},
			success: function(response){
				$("#infoMember").html('<span class="glyphicon glyphicon-user"></span> ' + response.data.attributes.username);
			},
		});
	}
	
}

function loadCurrentMember(secretToken, userId){
	$.ajax({
		url: REGISTER_API + "/" + userId,
		type: "GET",
		headers: { 'Authorization': secretToken},
		success: function(response){
			$('[name="nameInfo"]').val(response.data.attributes.username);
			$('[name="fullNameInfo"]').val(response.data.attributes.fullName);	
			$('[name="emailInfo"]').val(response.data.attributes.email);	
			$('[name="genderInfo"]').val(response.data.attributes.gender);
			var miliDay = new Date(response.data.attributes.birthDay);
			var day = miliDay.getDate();
			var month = miliDay.getMonth() + 1;
			var year = miliDay.getFullYear();

			if (day < 10) {
				day = "0" + day;
			}
			if (month < 10) {
				month = "0" + month;
			}
			var fullDay = year + "-" + month + "-" + day;
			$('[name="birtDayInfo"]').val(fullDay);
			
		},
	});
}

function validateInfoData(){
	// Validate username
	var isValidUsername = true;
	if ($('[name="nameInfo"]').val().length == 0 ) {
		$('[name="nameInfo"]').next().html("Vui lòng nhập username!");
		$('[name="nameInfo"]').next().addClass("error-msg");
		isValidUsername = false;
	} else if ($('[name="nameInfo"]').val().length < 7 ) {
		$('[name="nameInfo"]').next().html("Username phải có hơn 7 kí tự!");
		$('[name="nameInfo"]').next().addClass("error-msg");
		isValidUsername = false;
	} else {
		$('[name="nameInfo"]').next().html("");
		isValidUsername = true;
	}
	
	// Validate password
	var isValidPassword = true;
	if ($('[name="passwordInfo"]').val().length == 0 ) {
		$('[name="passwordInfo"]').next().html("Vui lòng nhập mật khẩu!");
		$('[name="passwordInfo"]').next().addClass("error-msg");
		isValidPassword = false;
	} else if ($('[name="passwordInfo"]').val().length < 7 ) {
		$('[name="passwordInfo"]').next().html("Mật khẩu phải dài hơn 7 kí tự!");
		$('[name="passwordInfo"]').next().addClass("error-msg");
		isValidPassword = false;
	} else {
		$('[name="passwordInfo"]').next().html("");
		isValidPassword = true;
	}

	// Validate rePassword
	var isValidrePassword = true;
	if ($('[name="rePasswordInfo"]').val().length == 0) {
		$('[name="rePasswordInfo"]').next().html("Vui lòng nhập lại mật khẩu!");
		$('[name="rePasswordInfo"]').next().addClass("error-msg");
		isValidrePassword = false;
	} else if ($('[name="rePasswordInfo"]').val() != $('[name="passwordInfo"]').val()) {
		$('[name="rePasswordInfo"]').next().html("Mật khẩu không khớp!");
		$('[name="rePasswordInfo"]').next().addClass("error-msg");
		isValidrePassword = false;
	}

	// Validate Email
	var isValidEmail = true;
	if ($('[name="emailInfo"]').val().length == 0) {
		$('[name="emailInfo"]').next().html("Vui lòng nhập email!");
		$('[name="emailInfo"]').next().addClass("error-msg");
		isValidEmail = false;
	} else {
		$('[name="emailInfo"]').next().html("");
		isValidEmail = true;
	}

	// Validate fullname
	var isValidfullName = true;
	if ($('[name="fullNameInfo"]').val().length == 0) {
		$('[name="fullNameInfo"]').next().html("Vui lòng nhập họ tên!");
		$('[name="fullNameInfo"]').next().addClass("error-msg");
		isValidfullName = false;
	} else if ($('[name="fullNameInfo"]').val().length < 7) {
		$('[name="fullNameInfo"]').next().html("Họ tên phải có hơn 7 kí tự!");
		$('[name="fullNameInfo"]').next().addClass('error-msg');
	} else{
		$('[name="fullNameInfo"]').next().html("");
		isValidfullName = true;
	}
	// Validate gender
	var isGender = true;
	if ($('[name="genderInfo"]').val() == -1) {
		$('[name="genderInfo"]').next().html("Vui lòng chọn giới tính!");
		$('[name="genderInfo"]').next().addClass("error-msg");
		isGender = false;
	}else{
		$('[name="genderInfo"]').next().html("");
		isGender = true
	}
	// Validate birtDay
	var isbirthDay = true;
	if ($('[name="birtDayInfo"]').val() == 0) {
		$('[name="birtDayInfo"]').next().html("Vui lòng chọn ngày sinh!");
		$('[name="birtDayInfo"]').next().addClass("error-msg");		
		isbirthDay = false;
	}
	else{
		$('[name="birtDayInfo"]').next().html("");
		isbirthDay = true;
	}

	// check Validate
	if (!(isValidPassword && isValidEmail && isValidUsername && isValidUsername && isValidrePassword && isValidfullName && isGender && isbirthDay)) {
		return false;
	}
	else{
		return true;
	}

}

// Lưu thông tin member. Gọi đến hàm saveMember với method PUT và id
// lấy từ localStorage.


//============== END Xử lý cập nhật thông tin Member ==============

//============== START Xử lý Playlist ==============
// Load danh sách playlist.
function loadPlaylists(){

}
//Validate playlist.
function validatePlaylist(){

}
// Lưu thông tin playlist.
function savePlaylist(){
	
}
//============== END xử lý Playlist ==============

//============== START Xử lý Video ==============
// Load danh sách video.

// Validate video.

// Lưu thông tin video.
//============== END xử lý Playlist ==============\

// Đăng xuất
function logoutHandle(){
	localStorage.removeItem("secretToken");
	localStorage.removeItem("userId");
	localStorage.removeItem("username");
	window.location.reload();
	loadMemberInfo();
}

// Load video
function loadVideo(keyword){
	var VIDEO_API = "https://content.googleapis.com/youtube/v3/search?q=" + keyword + "&type=video&maxResults=12&part=snippet&key=AIzaSyAwUjk3CwtXCiB_W6Xi0colfOKPgm90hHc";
	var xhr = new XMLHttpRequest();
	xhr.open("GET", VIDEO_API, true);
	xhr.onreadystatechange = function(){
		if (this.readyState == 4 && this.status == 200) {
			var responseObject = JSON.parse(this.responseText);
			var htmlContent = "";
			for (var i = 0; i < responseObject.items.length; i++) {
				if(responseObject.items[i].id.kind == 'youtube#channel'){
					continue;
				}
	
				htmlContent +=	'<div class="thumbnail video col-md-4">'
				htmlContent +=		'<img class="img-rounded" src="'+ responseObject.items[i].snippet.thumbnails.medium.url +'" onclick="showVideo(\'' + responseObject.items[i].id.videoId + '\')" data-toggle="modal" data-target="#video-frame">'
				htmlContent +=		'<div class="caption" style="text-align: center">'
				htmlContent +=			'<h5>'+ responseObject.items[i].snippet.title +'</h5>'
				htmlContent +=		'</div>'
				htmlContent += '</div>'
			}
			$('#list-video').html(htmlContent);
		}
	};
	xhr.send();
}

// Show video
var modal = document.getElementById("myModal");
function showVideo(videoId){		
	videoFrame.src = "https://www.youtube.com/embed/" + videoId + "?autoplay=1";
	setTimeout(function(){ 
		modal.style.display = "block";
	}, 300);	
}

// Close video
var videoFrame = document.getElementById("video-frame");
function closeVideo(){
	modal.style.display = "none";    
    videoFrame.src = "";
}
$(".close").onclick = function(){
	closeVideo();
}