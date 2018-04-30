$(function(){
	//token
	var reallyToken = window.localStorage.getItem('token');
	var shareToken = getQueryString('token');
	if(typeof(shareToken) != "undefined" && shareToken != ''){
		window.localStorage.setItem('token',shareToken);
		
		reallyToken = shareToken;
	}
	var typeId = "";
	
	//分类按钮效果
	$(".choose").on("click",function(){
		var ss = $("type-page").is(":hidden");
		console.log(ss);
		if($(".type-page").is(":hidden")){
			console.log(111);
			$(".type-page").show();
			$(".choose").addClass("choose-type-hide");
			$(".choose").removeClass("choose-type");
		}else{
			console.log(222);
			$(".type-page").hide();
			$(".choose").addClass("choose-type");
			$(".choose").removeClass("choose-type-hide");
		}
	});
			
	//textarea输入字符实时记录长度
	function wordStatic1(input) {  
    // 获取要显示已经输入字数文本框对象  
    var content = document.getElementById('pic1');  
        if (content && input) {  
            // 获取输入框输入内容长度并更新到界面  
            var value = input.value;  
            // 将换行符不计算为单词数  
            value = value.replace(/\n|\r/gi,"");
            if(value.length <= 200){
            	// 更新计数  
            	content.innerText = value.length; 
            }
        }  
	}
	function wordStatic2(input) {
    // 获取要显示已经输入字数文本框对象  
    var content = document.getElementById('pic2');  
        if (content && input) {  
            // 获取输入框输入内容长度并更新到界面  
            var value = input.value;  
            // 将换行符不计算为单词数  
            value = value.replace(/\n|\r/gi,"");
            if(value.length <= 200){
            	// 更新计数  
            	content.innerText = value.length; 
            }
        }  
	} 
	
	//获取分类列表
	function getTypeList(){
		$.ajax({
			type:"post",
			url: ajaxUrl+"/10202010",
			data: {
				token: reallyToken,
				jobId : getTimeMs(),
				classifyId : "100000000"
			},
			success:function(data){
				console.log("分类");
				console.log(data);
				var arr = data.data;
				if(arr.length>0){
					var dom = $(".type-ul");
					var str = '';
					for (var i=0;i<arr.length;i++) {
						/*<li><span class="li-span">全部</span></li>*/
						str = str +
						'<li><span class="li-text li-span" id="'+arr[i].centreClassifyId+'">'+arr[i].centreClassifyName+'<span></li>';
					}
					dom.append(str);
				}
			},
			error:function(error){
				console.log(data);
			}
		});
	}
	getTypeList();
	
	//保存用户素材信息
	function saveUserInfo(){
		var title = $("#inputTitle").val();
		var meno = $("#textareaText").val();
		var detail1 = $("#detail1").val();
		var detail2 = $("#detail2").val();
		var imgUrl1 = $("#img1").attr("src");
		var imgUrl2 = $("#img2").attr("src");
		if(typeof detail1 == undefined){
			detail1 = "";
		}
		if(typeof detail2 == undefined){
			detail1 = "";
		}
		if(typeof imgUrl1 == undefined){
			detail1 = "";
		}
		if(typeof imgUrl2 == undefined){
			detail1 = "";
		}
		console.log("title="+title+"   meno="+meno+"   detail1="+detail1+"   detail2="+detail2+ "   imgUrl1="+imgUrl1+ "    imgUrl2="+imgUrl2 +"   classifyId="+typeId);
		$.ajax({
			type:"post",
			url: ajaxUrl+"/1020201803",
			data: {
				token: reallyToken,
				jobId : getTimeMs(),
				classifyId : typeId,
				type : "1",
				urls: imgUrl1+','+imgUrl2,
				descriptions: detail1+','+detail2,
				title: title,
				meno1: meno
			},
			success:function(data){
				console.log(data);
				showMsg(data.message);
				function jump(){
					window.location.href = "person.html";
				}
				if(data.code == "0"){
					setInterval(jump,3000);
				}
			},
			error:function(error){
				console.log(data);
			}
		});
	}
	
	$("#img1").on("click", function() {
		var reallyToken = window.localStorage.getItem('token');
		var shareToken = getQueryString('token');
		if(typeof(shareToken) != "undefined" && shareToken != ''){
			window.localStorage.setItem('token',shareToken);
			reallyToken = shareToken;
		}
		console.log("upload1");
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
					$("#img1").attr("src",uploadPic);
					$("#details1").val(uploadPic);
				},
				error:function(data){
					console.log(data);
				}
			})
		});
	});
	
	$("#img2").on("click", function() {
		console.log("upload2");
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
					$("#img2").attr("src",uploadPic);
					$("#details2").val(uploadPic);
				},
				error:function(data){
					console.log(data);
				}
			})
		});
	});
	
	$(".btn-submit").on("click",function(){
		saveUserInfo();
	});
	
	//分类列表的点击事件
	$(document).on("click",".li-span",function(){
		$(this).removeClass("li-span");
		$(this).addClass("select-li-span");
		$(this).parent().siblings().children("span").removeClass("select-li-span");
		$(this).parent().siblings().children("span").addClass("li-span");
		typeId = $(this).attr('id');
	});
	
	//隐藏提示框
	function hideDialog(){
		$("#chint").addClass("dn");
	}
	//显示提示框
	function showMsg(msg){
		$("#chint").removeClass("dn");
		$("#chint").text(msg);
		setInterval(hideDialog,3000);
	}
});
