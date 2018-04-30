$(function(){
	//========公共变量===============
	var reallyToken = window.localStorage.getItem('token');
	var shareToken = getQueryString('token');
	if(typeof(shareToken) != "undefined" && shareToken != ''){
		window.localStorage.setItem('token',shareToken);
		
		reallyToken = shareToken;
	}
	
	//我的发布
	function getMyActivity(token){
		$.ajax({
			type: "post",
			url: ajaxUrl+"/1020201804",
			data: {
				token: token,
				jobId: getTimeMs()
			},
			success:function(data){
				console.log("我的发布");
				console.log(data);
				//showList(data.data);
			},
			error:function(error){
				console.log(data);
			}
		});
	}
	getMyActivity(reallyToken);
	
	//遍历我的活动
	function showList(arr) {
		console.log(arr);
			var str = '';
			var dom = $('#recommendList');
			
			dom.html('');
			
			if(!arr.length){
				return;
			}
			
			for(var i = 0 ; i < arr.length ; i++){
				var mUrl = 'activityDetails.html?puk='+arr[i].puk;

				str =  str +
'					<li>'+
'						<a class="passageImg" href="' + mUrl +'">'+
'							<img src="' + arr[i].lookPic + '" class="pic"  />'+
'						</a>'+
'						<div class="passageTxt" onclick="javascript:location.href=\''+ mUrl +'\'">'+
'							<a class="headings" href="' + mUrl +'">' + arr[i].activityName + '</a>'+
'							<div class="infor"><div class="read">'+ arr[i].enrolment + '<span>人参与</span></div>'+
'							</div>'+
'						</div>'+
'					</li>';
			}
			dom.append(str);	
	}
});
