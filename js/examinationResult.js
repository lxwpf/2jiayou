$(function() {
	//=====================公共变量==================
	var sucess = window.localStorage.getItem('sucess'); //读取本地缓存
	if(typeof(sucess) == "undefined" || sucess == '') {
		alert('操作无效，请从新开始！');
		location.href = "http://u.2jiayou.com/weixin/menu/3";
		return;
	}

	//考试成绩判断
	if(sucess > 5) {
		$('#cj_txt').text('这次考试你得了' + sucess + '0分，恭喜你通过入学考试！');
		$('#lx_success').removeClass("dn");
		$("#cj_msg_success").removeClass("dn");
	} else {
		$('#cj_txt').text('很遗憾你只得了' + sucess + '0分，未能通过入学考试，继续加油哦！');
		$("#cj_bg").attr("src", "../img/examination/get/fail.png");
		$("#cj_msg_fail").removeClass("dn");
		$('#lx_fail').removeClass("dn");
	}
	console.log(sucess);

	//////////////////////////////////////////////////////////////////////////////////////////////
	//领取通知书
	$(".get-again-btn").on("click", function() {
		window.localStorage.setItem('sucess', 0);
		location.href = '../examinationProcess.html';
	});
	//领取通知书
	$(".get-btn").on("click", function() {
		var userName = $('#userName').val(); //姓名
		if(userName.length < 2) {
			alert('请输入你的姓名');
			return;
		}
		var userPhone = $('#userPhone').val(); //手机号
		//校验手机号码
		var myreg = /^(((13[0-9]{1})|(14[5-9]{1})|(17[0]{1})|(15[0-3]{1})|(15[5-9]{1})|(166)|(17[0-8]{1})|(18[0-9]{1})|(19[8-9]{1}))+\d{8})$/;
		if(userPhone.length == '') {
			alert('请输入你的电话');
			return;
		} else if(userPhone.length != 11) {
			alert('请输入你的电话');
			return;
		} else if(!myreg.test(userPhone)) {
			alert('请输入你的电话');
			return;
		}

		window.localStorage.setItem('userName', userName);
		window.localStorage.setItem('userPhone', userPhone);

		location.href = '../examinationDown.html';
	});
	
	
	//加载微信分享
	loadWeixinShare('3');
	
});