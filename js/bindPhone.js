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
				console.log(userInfo);
				if(userInfo.phone != null){
					$('.alreadyBind').text("已绑定"+userInfo.phone);
					$("#noBind").addClass("dn");
					$("#bind").removeClass("dn");
				}
			},
			error:function(error){
				console.log(data);
			}
		});
	}
	getUserInfo(token);
	
	
	
	
	//onblur事件，输入框失去焦点触发，验证是否是手机号码
	$('#input1').blur(function(){
		var isPhoneNumber = $('#input1').val();
		console.log(isPhoneNumber);
		if(!judgePhone(isPhoneNumber)){
			$('#msg').text("请输入正确的手机号码！");
			$('#sendCode').css('color','#CBCBCB').removeAttr('id');
		}else{
			$('#msg').text("");
			$('.validata a').css('color','#0092ee').attr('id','sendCode');
		}
	});
		
	//发送验证码
	$('#sendCode').bind('click',function(){
		phoneNumber = $('#input1').val();
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
	$('#bindPhone').click(function(){
		var securityCode = $('#input2').val();
		$.ajax({

			type:"post",

			url:ajaxUrl+"/10402011",

			data:{
				token:token,
				phone:phoneNumber,
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
					$("#msg").text(data.message);
				}
			},
			error:function(error){
				console.log(error);
			}
		});
	});
	
	
	//加载微信分享
	loadWeixinShare('');
});
