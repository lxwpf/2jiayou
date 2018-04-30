$(function(){
	//========公共变量===============
	var reallyToken = window.localStorage.getItem('token');
	var shareToken = getQueryString('token');
	if(typeof(shareToken) != "undefined" && shareToken != ''){
		window.localStorage.setItem('token',shareToken);
		
		reallyToken = shareToken;
	}
	
	var pageCurrent = '1';		//当前页码
	var pageLimit = '100';		//每页条数
	var seachTime = '';			//筛选时间参数 格式 2018-03-02 12:00:00
	var activityTypeId = '';	//活动分类ID
	var isFree = '';			//是否收费 1收费 2免费
	
	//活动一览接口请求
	function requestActivity() {
		$.ajax({
			type:"post",
			url: ajaxUrl + "/10501010",
			data:{
				token : reallyToken,
				jobId : getTimeMs(),
				pageCurrent : pageCurrent,
				pageLimit : pageLimit
			},
			dataType:"json",
			success:function(data){
				console.log(data);	
				getActivityItem(data.data);
			},
			error:function(error){
				console.log(error);	
			}
		});			
	}
	requestActivity();
	
	//遍历
	
	function getActivityItem(arr){
		console.log(arr);
		var dom = $("#yspList");
		
		if(!arr.length){
			return;
		}
		
		dom.html('');
		
		var str = '';		
		var flag = '';
		
		for(var i=0;i < arr.length;i++){
			var isJoin = '';
			flag = arr[i].flag;
			var startTime = arr[i].activityStartTime.substring(0,10);
			var endTime = arr[i].activityEndTime.substring(0,10);
			if(flag == '0'){
				isJoin = "未报名";
			}else{
				isJoin = "已报名";
			}
			str = str +
				'<li>'+
				'<a href="activityDetails.html?puk='+arr[i].puk+'">'+
				'<div class="middle-a"><span class="activity-icon"><label class="text">'+arr[i].activityTypeName+'</label></span>'+
				'<p>'+arr[i].activityName+'</p>'+
				'</div>'+
				'<div class="video">'+
				'<img src="'+arr[i].lookPic+'" class="bg" />'+
				'<div class="video-bottom">'+
				'<span class="b-left">'+arr[i].activityPlace+'</span>'+
				'<span class="b-right">'+startTime+'至'+endTime+'</span>'+
				'</div>'+
				'</div>'+
				'<div class="video-introduce">'+
				'<span class="money">'+arr[i].activityPrice+'<span>元'+
				'共<span>'+arr[i].enrolment+'</span>人参加'+
				'<span class="right-btn">'+isJoin+'</span>'+
				'</div>'+
				'</a>'+
				'<li>';
			isJoin = '';
		}
		
		dom.append(str);
	}
});	