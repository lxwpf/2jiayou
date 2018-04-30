$(function() {
	//获得token
	function getToken(){
		var reallyToken = window.localStorage.getItem('token');
		var shareToken = getQueryString('token');
		if(typeof(shareToken) != "undefined" && shareToken != ''){
			window.localStorage.setItem('token',shareToken);
			reallyToken = shareToken;
		}
		return reallyToken;
	}
	
	/*手持身份证*/
	$("#upload1").on("click", function() {
		var reallyToken = window.localStorage.getItem('token');
		var shareToken = getQueryString('token');
		if(typeof(shareToken) != "undefined" && shareToken != ''){
			window.localStorage.setItem('token',shareToken);
			reallyToken = shareToken;
		}
		
		$("#FileUpload").click();
		
		$("#FileUpload").change(function(){
			//本地上传文件对象
			var fileObj = document.getElementById("FileUpload").files[0]; // js 获取文件对象
			if(typeof(fileObj) == "undefined" || fileObj.size <= 0) {
				alert("请选择图片");
				return;
			}
			
			var formFile = new FormData();
			formFile.append("token",reallyToken);
	        formFile.append("isPicture", "T");   
	        formFile.append("file", fileObj); //加入文件对象
			
			$.ajax({
				type: "Post",
				url: ajaxUrl + "/1020201801",
				data: formFile,
				dataType: "json",
				contentType:false, //必须false才会避开jQuery对 formdata 的默认处理 , XMLHttpRequest会对 formdata 进行正确的处理
	        	processData: false, //必须false才会自动加上正确的Content-Type 
				success: function(result) {
					var uploadPic = result.message;
					console.log(result);
					$("#upload1").addClass("dn");
					$("#upload1-img").removeClass("dn");
					$("#upload1-img").attr("src",uploadPic);
					$("#scsfzPic").val(uploadPic);
				},
				error:function(data){
					console.log(data);
				}
			})
		});
	});
	
	/*身份证正面*/
	$("#upload2").on("click", function() {
		var reallyToken = window.localStorage.getItem('token');
		var shareToken = getQueryString('token');
		if(typeof(shareToken) != "undefined" && shareToken != ''){
			window.localStorage.setItem('token',shareToken);
			reallyToken = shareToken;
		}
		
		$("#FileUpload2").click();
		
		$("#FileUpload2").change(function(){
			//本地上传文件对象
			var fileObj = document.getElementById("FileUpload2").files[0]; // js 获取文件对象
			if(typeof(fileObj) == "undefined" || fileObj.size <= 0) {
				alert("请选择图片");
				return;
			}
			
			var formFile = new FormData();
			formFile.append("token",reallyToken);
	        formFile.append("isPicture", "T");   
	        formFile.append("file", fileObj); //加入文件对象
			
			$.ajax({
				type: "Post",
				url: ajaxUrl + "/1020201801",
				data: formFile,
				dataType: "json",
				contentType:false, //必须false才会避开jQuery对 formdata 的默认处理 , XMLHttpRequest会对 formdata 进行正确的处理
	        	processData: false, //必须false才会自动加上正确的Content-Type 
				success: function(result) {
					var uploadPic = result.message;
					console.log(result);
					$("#upload2").addClass("dn");
					$("#upload2-img").removeClass("dn");
					$("#upload2-img").attr("src",uploadPic);
					$("#idcard-up-pic").val(uploadPic);
				},
				error:function(data){
					console.log(data);
				}
			})
		});
	});
	
	/*身份证反面*/
	$("#upload3").on("click", function() {
		var reallyToken = window.localStorage.getItem('token');
		var shareToken = getQueryString('token');
		if(typeof(shareToken) != "undefined" && shareToken != ''){
			window.localStorage.setItem('token',shareToken);
			reallyToken = shareToken;
		}
		
		$("#FileUpload3").click();
		
		$("#FileUpload3").change(function(){
			//本地上传文件对象
			var fileObj = document.getElementById("FileUpload3").files[0]; // js 获取文件对象
			if(typeof(fileObj) == "undefined" || fileObj.size <= 0) {
				alert("请选择图片");
				return;
			}
			
			var formFile = new FormData();
			formFile.append("token",reallyToken);
	        formFile.append("isPicture", "T");   
	        formFile.append("file", fileObj); //加入文件对象
			
			$.ajax({
				type: "Post",
				url: ajaxUrl + "/1020201801",
				data: formFile,
				dataType: "json",
				contentType:false, //必须false才会避开jQuery对 formdata 的默认处理 , XMLHttpRequest会对 formdata 进行正确的处理
	        	processData: false, //必须false才会自动加上正确的Content-Type 
				success: function(result) {
					var uploadPic = result.message;
					console.log(result);
					$("#upload3").addClass("dn");
					$("#upload3-img").removeClass("dn");
					$("#upload3-img").attr("src",uploadPic);
					$("#idcard-down-pic").val(uploadPic);
				},
				error:function(data){
					console.log(data);
				}
			})
		});
	});
	
	/*下一页*/
	$("#next-page").on("click",function(){
		$(".threed").removeClass("dn");
		$(".sencond").addClass("dn");
	});
	
	/*提交*/
	$(".btn-submit").on("click",function(){
		var fb4 = $("#scsfzPic").val();	//手持身份证照片
		var realPhoto = $("#idcard-up-pic").val();	//身份证正面
		var meno = $("#idcard-down-pic").val();	//身份证反面
		
		console.log("手持身份证="+fb4);
		console.log("身份证正面="+realPhoto);
		console.log("身份证反面="+meno);
		if(fb4 == undefined || fb4 == null){
			fb4 = "";
			showMsg("手持身份证照片不能为空");
			return;
		}
		if(realPhoto == undefined || realPhoto == null){
			realPhoto = "";
			showMsg("身份证正面照片不能为空");
			return;
		}
		if(meno == undefined || meno == null){
			meno = "";
			showMsg("身份证反面照片不能为空");
			return;
		}
		$.ajax({
			type: "Post",
			url: ajaxUrl + "/1020201802",
			data: {
				token: getToken(),
				realPhoto: realPhoto,
				meno: meno,
				fb4: fb4
			},
			dataType: "json",
			success: function(result) {
				console.log(result);
				showMsg(result.message);
				if(result.code == 0){
					
				}
			},
			error:function(data){
				console.log(data);
			}
		})
	});
	
	//跳转到完成认证页面
	function jumpResult(){ }
	
	//隐藏提示框
	function hideDialog(){
		$("#chint").addClass("dn");
		//window.location.href= "person.html";
	}
	//显示提示框
	function showMsg(msg){
		$("#chint").removeClass("dn");
		$("#chint").text(msg);
		setInterval(hideDialog,3000);
	}
});