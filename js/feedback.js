function validata(){
	var currentText = ($('#textareaText').val()).length;
	$("#maxText").text(currentText);
}

$(function(){
	//=======================当前页面公共变量======================
	var token = window.localStorage.getItem('token');	//获取本地缓存token
	var submitUrl = ajaxUrl+"/10403010";				//用户反馈接口地址
	//============================================================
	
	//监听文本长度
	$('#textareaText').on('textarea propertychange',function(){
		console.log(($('#textareaText').val()).length);
	});
	
	$("#submitContent").click(function(){
		var textareaText = $('#textareaText').val();
		//拦截失败情况
		if(typeof(textareaText) == "undefined" || textareaText == ''){
			return;
		}

		if(lock === 0)
			lock = 1;
		else
			return;
		
		$.ajax({
			type:"post",
			url:submitUrl,
			data:{
				token:token,
				jobId:getTimeMs(),
				feedbackContent:textareaText
			},
			success:function(data){
				console.log(data);
				if(data.code == "0"){
					window.location.href = "person.html";
				}
			},
			error:function(error){
				console.log(error);
			}
		});
	});
	var lock = 0;
	
	//加载微信分享
	loadWeixinShare('');
});
