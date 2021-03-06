$(function(){
	//Token整理
	var reallyToken = window.localStorage.getItem('token');
	var shareToken = getQueryString('token');
	if(typeof(shareToken) != "undefined" && shareToken != ''){
		window.localStorage.setItem('token',shareToken);
		
		reallyToken = shareToken;
	}
	
	//当前页变量
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
				console.log(data);
				addDateToPage(data.data);
			},
			error: function(data){
				console.log(data);
			}
		});
	}
	getActivityInfomation();
	
	//填充数据
	function addDateToPage(data){
		if(data!=null){
			$("#activity-img").attr("src",data.lookPic);
			$(".activity-name").text(data.activityName);
			$(".activity-time").text(data.activityStartTime.substring(0,10)+"~"+data.activityEndTime.substring(0,10));
			$(".activity-place").text(data.activityPlace);
			$(".activity-people").text(data.enrolment);
			$(".activity-host").text(data.compere);
			$(".activity-infomation").text(data.activityDetail);
			$(".activityPrice").text(data.activityPrice);
			
			var flag = data.flag;
			//1已报名，其它未报名
			if(flag == "1"){
				$(".btn-submit").text("已报名");
				$(".next-page").attr("href","#");
			}else{
				$(".btn-submit").text("未报名");
				$(".next-page").attr("href","userInfomation.html?puk="+data.puk);
			}
		}
	}
});
