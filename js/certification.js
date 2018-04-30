$(function(){
	
	//==========================公共变量================================
	var token = window.localStorage.getItem('token');
	var phoneNumber = null;
	var t = 60;
	//=================================================================
	
	//用户基本资料
	function getUserInfo(token){
		$.ajax({
			type: "post",
			url: ajaxUrl+"/10401010",
			data: {
				token: token,
				jobId: getTimeMs()
			},
			success:function(data){
				var userInfo = data.data;
				console.log("用户基本资料");
				console.log(data);
				//已绑定手机号码，跳转实名认证
				if(userInfo.phone != null){
					//window.location.href = "certification2.html";
					//applyStateReal实名审核状态，1待审核，2通过，3不通过
					if(userInfo.applyStateReal == "1"){
						$(".tatol").addClass("dn");
						$(".crtificationResult").removeClass("dn");
						$(".realName").text(userInfo.realName);
						$(".result").text("正在审核中，请耐心等待...");
					}else if(userInfo.applyStateReal == "2"){
						$(".tatol").addClass("dn");
						$(".crtificationResult").removeClass("dn");
						$(".realName").text(userInfo.realName);
						$(".result").text("已通过审核,无需再次认证");
					}else if(userInfo.applyStateReal == "3"){
						$(".tatol").addClass("dn");
						$(".crtificationResult").removeClass("dn");
						$(".realName").text(userInfo.realName);
						$(".result").text("没有通过审核");
						//三秒钟之后跳到实名认证
						showMsg("三秒钟之后跳到实名认证");
						setInterval(showCertification,3000);
					}else{
						//审核状态默认等于9，默认状态不需要处理
					}
				}
			},
			error:function(error){
				console.log(data);
			}
		});
	}
	getUserInfo(token);
	
	//显示实名认证页面
	function showCertification(){
		$(".tatol").removeClass("dn");
		$(".crtificationResult").addClass("dn");
	}
	
	//隐藏提示框
	function hideDialog(){
		$("#chint").addClass("dn");
	}
	
	//onblur事件，输入框失去焦点触发，验证是否是手机号码
	$('#phoneNumber').blur(function(){
		var phoneNumber = $("#phoneNumber").val();
		//验证手机号码是否正确
		if(judgePhone(phoneNumber)){
			
		}else{
			showMsg("手机号码格式错误！");
		}
	});
		
	//发送验证码
	$('#sendCode').bind('click',function(){
		phoneNumber = $('#phoneNumber').val();
		if(phoneNumber != null && phoneNumber != ""){
			$.ajax({
				type:"post",
				url:ajaxUrl+"/99999090",
				data:{
					token: token,
					phone: phoneNumber
				},
				success:function(data){
					console.log(data);
				},
				error:function(error){
					console.log(error);
				}
			});
			countdownTime(60,'sendCode');
		}else{
			$('#msg').text("手机号码不能为空！");
			$('#sendCode').css('color','#CBCBCB').removeAttr('id');
		}
	});
	
	//绑定手机
	$('#btnSubmit').click(function(){
		var securityCode = $('#input2').val();
		var realName = $("#realName").val();
		var idCard = $("#idCard").val();
		if(securityCode == '' || realName == ''){
			$("#chint").removeClass("dn");
			$("#chint").text("不能为空！");
			setInterval(hideDialog,3000);
		}else{
			bindPhone(realName,securityCode,idCard);
		}
	});
	
	function bindPhone(realName,securityCode,idCard){
		$.ajax({
			type:"post",
			url:ajaxUrl+"/10402011",
			data:{
				token:token,
				phone:phoneNumber,
				realName: realName,
				idCard: idCard,
				securityCode:securityCode,
				jobId:getTimeMs()
			},
			success:function(data){
				console.log("绑定手机");
				console.log(data);
				if(data.code == "0"){
					$('.alreadyBind').text("已绑定"+phoneNumber);
					$("#noBind").addClass("dn");
					$("#bind").removeClass("dn");
				}else if(data.code == "1"){
					showMsg(data.message);
				}
			},
			error:function(error){
				console.log(error);
			}
		});
	}
	//加载微信分享
	//loadWeixinShare('');
	
	function showMsg(msg){
		$("#chint").removeClass("dn");
		$("#chint").text(msg);
		setInterval(hideDialog,3000);
	}
});
