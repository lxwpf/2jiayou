$(function(){
	//=====================当前页面全局变量=============================
	var token = window.localStorage.getItem('token');		//缓存中取token
	var editUrl = ajaxUrl+"/10402010";						//编辑资料接口地址
	var userInfoUrl = ajaxUrl+"/10401010";					//获取用户资料url
	//=================================================================
	
	//请求用户资料
	function getUserInfo(token,userInfoUrl){
		$.ajax({
			type:'post',
			url: userInfoUrl,
			data:{
				token:token,
				jobId:getTimeMs()
			},
			dataType:'json',
			success:function(data){
				console.log(data);
				var info = data.data;
				if("" != info.headPortraitUrl || null != info.headPortraitUrl){
					$('#titleIcon').attr("src",info.headPortraitUrl);
				}else{
					$('#titleIcon').attr("src","img/person/c-1.png");
				}
				$('#nickName').val(info.nickName);
				//sex 0保密，1男，2女
				if(info.sex == "0"){
					$('#sex').val('0');
				}else if(info.sex == "1"){
					$('#sex').val('1');
				}else{
					$('#sex').val('2');
				}
				$('#birthday').val(info.birthday);
			},
			error:function(error){
				console.log(error);
			}
		});
	}
	getUserInfo(token,userInfoUrl);
	
	//保存提交编辑资料
	$('#saveBtn').on('click',function(){
		var nickName = $('#nickName').val();					//编辑后的昵称
		var sex = $('#sex').val();								//编辑后的sex
		var birthday = $('#birthday').val();					//编辑后的出生日期
		$.ajax({

			type:"post",

			url:editUrl,

			data:{
				token: token,
				jobId: getTimeMs(),
				headPortraitUrl: '',
				nickName: nickName,
				sex: sex,
				birthday: birthday,
				realName: '',
				idCard: '',
				realPhoto: ''
			},
			dataType:'json',
			success:function(data){
				console.log(data);
				if(data.code == "0"){
					window.location.href= 'person.html';
				}
			},
			error:function(error){
				console.log(error);
			}
		});
	});
	
	/*Zepto('#birthday').mdater({
		minDate : new Date(2015, 2, 10)
	});*/
});
