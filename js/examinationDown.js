$(function() {
	// =====================公共变量==================
	var editUrl = ajaxUrl + "/10402010"; // 编辑资料接口地址
	var userName = window.localStorage.getItem('userName'); // 读取本地缓存
	var userPhone = window.localStorage.getItem('userPhone'); // 读取本地缓存

	// 合法性检验
	function checkExamination() {
		if (typeof (userName) == "undefined" || userName == ''
				|| userName == null) {
			alert('操作无效，请从新填写！');
			location.href = '../examinationResult.html';
			return;
		}
		if (typeof (userPhone) == "undefined" || userPhone == ''
				|| userPhone == null) {
			alert('操作无效，请从新填写！');
			location.href = '../examinationResult.html';
			return;
		}

		console.log(userName);
		console.log(userPhone);

		// 保存提交编辑资料
		$.ajax({

			type : "post",

			url : editUrl,

			data : {
				token : currentToken,
				jobId : getTimeMs(),
				nickName : userName,
				phone : userPhone
			},
			dataType : 'json',
			success : function(data) {
				console.log(data);
			},
			error : function(error) {
				console.log(error);
			}
		});
	}

	checkExamination();

	// 初始化
	$('#userName').text(userName + '同学：');

	// 图片保存
	$(".save").on("click", function() {
	});
	html2Image($('.zsbg'), $("#zs")[0]);

	// 家游首页
	$(".home").on("click", function() {
		location.href = "http://u.2jiayou.com/weixin/menu/1";
	});

	// 加载微信分享
	loadWeixinShare('3');

});
