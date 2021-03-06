$(function(){
	//Token整理
	var reallyToken = window.localStorage.getItem('token');
	var shareToken = getQueryString('token');
	if(typeof(shareToken) != "undefined" && shareToken != ''){
		window.localStorage.setItem('token',shareToken);
		
		reallyToken = shareToken;
	}
	
	//获取活动的puk
	var puk = getQueryString('puk');
	
	//根据puk查询活动详情
	function getActivityInfomation(){
		$.ajax({
			type: "post",
			url: ajaxUrl + "/10501050",
			data:{
				token : reallyToken,
				jobId : getTimeMs(),
				activityId : puk
			},
			dataType:"json",
			success:function(data){
				//提交用户信息
				$(".submit-btn").on("click",function(){
					var	userName = $("#realName").val();			//用户名
					var userPhone = $("#phoneNumber").val();			//用户手机号
					var userAdress = $("#details-area").val();		//详细地址
					
					if(userName == null || userName == ""){
						showMsg("姓名不能为空");
						return;
					}
					if(userPhone == null || userPhone == ""){
						showMsg("手机号不能为空");
						return;
					}
					if(userAdress == null || userAdress == ""){
						showMsg("地址不能为空");
						return;
					}
					addUser(data);
				});
			},
			error: function(data){
				console.log(data);
			}
		});
	}
	getActivityInfomation();
	
	//报名
	function addUser(data){
		console.log("报名");
		var data = data.data;
		console.log(data);
		//用户报名所需变量
		var activityId = data.puk;		//活动id
		console.log(activityId);
		var activityName = data.activityName;		//活动名称
		var activityTime = data.activityStartTime;		//活动时间
		var typeId = data.activityTypeId;			//分类ID
		var	typeName = data.activityTypeName;			//分类名称
		var type = data.activityTypeType;				//所属类型 1000线上,2000线下
		var	userName = $("#realName").val();			//用户名
		var userPhone = $("#phoneNumber").val();			//用户手机号
		var address = $("#dd-text").text();
		//根据>切割字符串
		var arrStr = address.split(">");
		console.log(arrStr);
		var userProvince = arrStr[0];		//省
		var userCity = arrStr[1];			//市
		var userArea = arrStr[2];			//区
		var userAdress = $("#details-area").val();		//详细地址
		//用户报名
		function subUserInfo() {
			$.ajax({
				type:"post",
				url: ajaxUrl + "/10501040",
				data:{
					token : reallyToken,
					jobId : getTimeMs(),
					activityId : activityId,
					activityName : activityName,
					activityTime : activityTime,
					typeId : typeId,
					typeName : typeName,
					type : type,
					userName : userName,
					userPhone : userPhone,
					userProvince : userProvince,
					userCity : userCity,
					userArea : userArea,
					userAdress : userAdress
				},
				dataType:"json",
				success:function(data){
					console.log(data);
					showMsg(data.message);
					function jump(){
						window.location.href = "activity.html";
					}
					if(data.code == "0"){
						setInterval(jump,3000);
					}
				},
				error:function(error){
					console.log(error);	
				}
			});			
		}
		subUserInfo();
	}
	
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
