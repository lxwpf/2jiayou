$(function(){
	//当页变量
	//获取地理位置
	var city = remote_ip_info.city;

	//改变地理位置
	function changeCity() {
		$('#city').text(city);
	}
	
	//获取满屏高度，并设置html满屏颜色
	function setBgColor() {
		var height = $(document).height() + 'px';
		$('html').css('height',height);
		$('body').css('height',height);
	}
	
	//遍历今日推荐
	function showList(arr) {
		var str = '';
		var dom = $('#recommendList');
		if(pageCurrent <= 1)
			dom.html('');
		
		if(!arr.length){
			//刷新初始化
			refData = 0;
			return;
		}
		
		for(var i = 0 ; i < arr.length ; i++){
			var isVideo = arr[i].type == 4 ? ' ' : 'dn';
			var isMusic = arr[i].type == 5 ? ' ' : 'dn';
			
			var jumpTxt = arr[i].type == 4 ? 'newMultimedia.html' :
			              arr[i].type == 5 ? 'newMultimedia.html' :
			                                 'newArticle.html';

	  	var base = new Base64(); 
	  	var name = base.encode(arr[i].smallClassifyName);				                                 
			
			var mUrl = jumpTxt + '?classify=' + arr[i].classify + '&materialId=' + arr[i].materialId + '&classifyId=' + arr[i].classifyId +'&centreClassifyId=' + arr[i].centreClassifyId + '&smallClassifyName=' + name + '&numApplaud=' + arr[i].numApplaud + '&numUser=' + arr[i].numUser + '&onlineTime=' + arr[i].onlineTime;

			//change title
			var title = changeStr2(arr[i].title,26);
			str =  str +
'					<li>'+
'						<a class="passageImg" href="' + mUrl +'">'+
'							<img src="' + arr[i].lookPicUrl + '" class="pic"  />'+
'							<img src="img/common/4.png" class="video ' + isVideo + '" />'+
'							<img src="img/common/5.png" class="music ' + isMusic + '" />'+
'						</a>'+
'						<div class="passageTxt" onclick="javascript:location.href=\''+ mUrl +'\'">'+
'							<a class="headings" href="' + mUrl +'">' + title + '</a>'+
'							<div class="infor">'+
'								<div class="read">阅读量 <span>' + arr[i].numRead + '</span></div>'+
'								<a class="type" href="articleList.html?centreClassifyId=' + arr[i].centreClassifyId + '">' + arr[i].centreClassifyName  + '</a>'+
'							</div>'+
'						</div>'+
'					</li>';
			
			//console.log(str);
		}
		dom.append(str);
		//刷新初始化
		refData = 0;
		pageCurrent = pageCurrent + 1;
	}
	
	//今日推荐ajax
	function todayRecommendApi() {
		$.ajax({
			type:"post",
			url: ajaxUrl + "/10201030",
			data:{
				jobId : getTimeMs(),
				token : currentToken,
				pageCurrent : pageCurrent
			},
			dataType:"json",
			success:function(data){
				//console.log(data);
//				console.log(data.data[0].classify);//是否合集
//				console.log(data.data[0].type);//什么类别
//				console.log(data.data[0].lookPicUrl);//封面
//				console.log(data.data[0].title);//标题
//				console.log(data.data[0].materialId);//素材ID
//				console.log(data.data[0].classifyId);//分类流水ID			
//				console.log(data.data[0].numRead);//阅读次数
//	
//				console.log(data.data[0].centreClassifyId)//中分类ID
//				console.log(data.data[0].centreClassifyName)//中分类名称	
//					numApplaud 点赞数
//					numUser 收藏数
//						smallClassifyName 小分类名称
//          onlineTime  发布时间
				showList(data.data)
			},
			error:function(error){
				console.log(error);	
			}
		});		
	}
	//换一批方法
	$('#changeInfor').on('click',function(){
		todayRecommendApi();
	})

	//下拉刷新
	var refData = 0;
	var pageCurrent = 1;
	$(window).scroll(function(){ 
		//获取滚动条滚动过的距离 
	    if($(document).scrollTop() >= $(document).height()-$(window).height()-200) {  
			//开始加载
			if(refData==0){
				refData = 1;
				todayRecommendApi();
			}
		}  
	})  
	
	//展示今日宜做什么
	function showGoodDo(arr) {
		if(arr.length == 0){
			$('#good').text('');
			return;
		}
		if(arr.length == 1){
			$('#good').text(arr[0]);
			return;
		}
		if(arr.length == 2){
			$('#good').text(arr[0] + ' ' + arr[1]);
			return;
		}
		$('#good').text(arr[0] + ' ' + arr[1] + ' ' + arr[2]);
	}
	//展示今日忌做什么
	function showBadDo(arr) {
		if(arr.length == 0){
			$('#bad').text('');
			return;
		}
		if(arr.length == 1){
			$('#bad').text(arr[0]);
			return;
		}
		if(arr.length == 2){
			$('#bad').text(arr[0] + ' ' + arr[1]);
			return;
		}
		$('#bad').text(arr[0] + ' ' + arr[1] + ' ' + arr[2]);		
	}	
	//日历api
	function getDateApi() {
		$.ajax({
			type:"post",
			url: ajaxUrl + "/10201010",
			data:{
				jobId : getTimeMs(),
				token : currentToken
			},
			dataType:"json",
			success:function(data){
//				console.log(data);
				$('#year').text(data.data.year + '-' + data.data.month);
				$('#week').text(data.data.week);
				$('#lunar').text(data.data.nongli);
				$('#day').text(data.data.day);
				showGoodDo(data.data.yi);
				showBadDo(data.data.ji);
			},
			error:function(error){
				console.log(error);	
			}
		});		
	}	
	
	//天气api
	function getWeatherApi() {
		$.ajax({
			type:"post",
			url: ajaxUrl + "/10201020",
			data:{
				jobId : getTimeMs(),
				token : currentToken,
				city : city
			},
			dataType:"json",
			success:function(data){
				//console.log(data);
				$('#degree').text(data.data.temp);
				$('#cloudImg').attr('src',data.data.img)
				$('#state').text(data.data.weather);
				$('#wind').text(data.data.winddirect+data.data.windpower);

			},
			error:function(error){
				console.log(error);	
			}
		});		
	}	
	
	//第一次加载调用方法
	changeCity();
	setBgColor();	
	todayRecommendApi();
	getDateApi();
	getWeatherApi();
	
	//加载微信分享
	loadWeixinShare('');
});
