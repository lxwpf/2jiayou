$(function(){
	//============================================公共变量==========================================================
	var sexCode = '0';                							//区分性别，初始为0，1是男，2是女
	var age = null;					  							//区分年龄大小，用于请求传送该参数
	var education = null;			  							//区分学历
	var token = window.localStorage.getItem('token');			//获取缓存token
	//============================================公共变量==========================================================


	//选中性别
	$('#sex span').bind('click',function(){
		$('#sex span').removeClass('selected');
		$(this).addClass('selected');
		var sex = $(this).text();
		if(sex == '男'){
			sexCode = '1';
		}else{
			sexCode = '2';
		}
	});	
	
	//选中年龄
	$('#age span').bind('click',function(){
		$('#age span').removeClass('selected');
		$(this).addClass('selected');
		var ageText = $(this).text();
		switch(ageText){
			case '40后':
				age = '40';
				break;
			case '50后':
				age = '40';
				break;
			case '60后':
				age = '40';
				break;
			case '70后':
				age = '40';
				break;
			case '其它':
				age = '999';
				break;
		}
	});	
	
	//选中学历
	$('#xueli span').bind('click',function(){
		$('#xueli span').removeClass('selected');
		$(this).addClass('selected');
		var educationText = $(this).text();
		if(educationText == '初中及以下'){
			education = '1';
		}else if(educationText == '高中'){
			education = '2';
		}else{
			education = '3';
		}
	});	

//=============================================== lx code ===============================================================	
	//下一页
	$("#nextPage").click(function(){
		//用户资料收集接口
		$.ajax({
			type:"post",
			url:ajaxUrl+"/10102010",
			data:{
				token : token,
				jobId : getTimeMs(),
				sex : sexCode,
				ageGroup : age,
				education : education
			},
			dataType:"json",
			success:function(data){
				console.log(data);
				window.location.href= 'guiding2.html';
			},
			error:function(error){
				console.log(error);
				window.location.href= 'guiding2.html';
			}
		});
	});


	//获取浏览器地址栏参数，name想要获取的参数值key
	function getUrlParam(name)
	{
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg);  //匹配目标参数
		if (r!=null) return unescape(r[2]); return null; //返回参数值
	}

});
