var reallyToken = window.localStorage.getItem('token');
//延迟显示
function showMessage(str){
	$(".showAlert").removeClass("dn");
	$(".showAlert span").text(str);
}

//延时隐藏
function hiddenMessage(){
	setTimeout(function(){
		$(".showAlert").addClass("dn");
	},1500);
}

//返回主页
function goHome(){
	setTimeout(function(){
		location.href="http://u.2jiayou.com/weixin/menu/1";
	},1800);
}

$(function(){

	//判断用户是否获取token
	function judgeUser() {
		//Token整理
		var shareToken = getQueryString('token');
		if(typeof(shareToken) != "undefined" && shareToken != ''){
			window.localStorage.setItem('token',shareToken);
			
			reallyToken = shareToken;
		}

		if(reallyToken == ''){
			location.href = "http://u.2jiayou.com/weixin/menu/2";
		}
	}

	
	//核销功能
	$('#checkBtn').bind('click',function(){
		var ticketType = '1';//券码类型
		var writeoffType = '1';//核销方式
		var writeoffName = $('#writeoffName').val();		//核销姓名
		if(writeoffName.length<2){
			setTimeout(function(){
				showMessage('请输入兑奖人姓名');
				hiddenMessage();
			}, 800);
			return;
		}
		var writeoffPhone = $('#writeoffPhone').val();		//核销手机号
		//校验手机号码
		var myreg = /^(((13[0-9]{1})|(14[5-9]{1})|(17[0]{1})|(15[0-3]{1})|(15[5-9]{1})|(166)|(17[0-8]{1})|(18[0-9]{1})|(19[8-9]{1}))+\d{8})$/;
		if(writeoffPhone.length == '' ){
			setTimeout(function(){
				showMessage('请输入兑奖人手机号');
				hiddenMessage();
			}, 100);
			return;
		}else if(writeoffPhone.length !=11){
			setTimeout(function(){
				showMessage('请输入有效的手机号码');
				hiddenMessage();
			}, 100);
			return;
		}else if(!myreg.test(writeoffPhone)){
			setTimeout(function(){
				showMessage('请输入有效的手机号码');
				hiddenMessage();
			}, 100);
			return;
		}
		var writeoffAddress = $('#writeoffAddress').val();		//核销地址
		if(writeoffAddress.length<3){
			setTimeout(function(){
				showMessage('请输入兑奖人地址');
				hiddenMessage();
			}, 100);
			return;
		}
		var ticketNumber = $('#ticketNumber').val();		//券码号码
		if(ticketNumber.length<14){
			setTimeout(function(){
				showMessage('请输入14位兑奖码');
				hiddenMessage();
			}, 100);
			return;
		}

		$.ajax({
			type:"post",
			url: ajaxUrl + "/71101010",
			data:{
				token : reallyToken,
				jobId : getTimeMs(),
				ticketType :ticketType,
				writeoffType : writeoffType,
				writeoffName : writeoffName,
				writeoffPhone : writeoffPhone,
				writeoffAddress : writeoffAddress,
				ticketNumber : ticketNumber
			},
			dataType:"json",
			success:function(rest){
				//console.log(data);
				if(rest.data === '0'){
					//核销成功
					setTimeout(function(){
						showMessage('兑换成功');
						hiddenMessage();
						goHome();
					}, 100);
				}else{
					//核销失败
					setTimeout(function(){//'兑奖码输入错误'
						showMessage(rest.message);
						hiddenMessage();
					}, 100);
				}
			},
			error:function(error){
				console.log(error);	
			}
		});	
	});

	//初始化
	judgeUser();
});
