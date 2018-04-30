$(function(){
	//=====================公共变量==================

	//轮播banner遍历
	function showBannerList(arr) {
			var str = '';
			var dom = $('#swiper');
			
			dom.html('');
			
			if(typeof(arr) == "undefined" || !arr.length){
				return;
			}			
			
			for(var i = 0 ; i < arr.length ; i++){
				
				str =  str +
'	      <div class="swiper-slide">'+
'	      	<img src="'+ arr[i].picUrl +'"  onclick="location.href=\''+arr[i].redirectUrl+'\'"/>'+
'	      </div>'	
			}
			dom.append(str);					
	}	
	//轮播aqpi
	function bannerApi() {
		$.ajax({
			type:"post",
			url: ajaxUrl + "/10301010",
			data:{
				token : window.localStorage.getItem('token'),
				jobId : getTimeMs(),
				adsenseId : '2'
			},
			dataType:"json",
			success:function(data){
				console.log(data);
				//console.log(data.data);
				showBannerList(data.data);
				
			
				//banner轮播生成插件-Swiper
				var swiper = new Swiper('.swiper-container', {
			    pagination: {
			      el: '.swiper-pagination',
			    },
			  });				
			},
			error:function(error){
				console.log(error);	
			}
		});
	}
	
	bannerApi();


	//学院分类列表api	
	function getTypeAllApi() {
		$.ajax({
			type:"post",
			url: ajaxUrl + "/10202010",
			data:{
				token : currentToken,
				jobId : getTimeMs(),
				classifyId : '200110000'
			},
			dataType:"json",
			success:function(data){
				//console.log("学院分类列表请求成功");
				//console.log(data);
//				console.log(data.data[0].smallClassifyId);
//				console.log(data.data[0].smallClassifyName);
				showTypeList(data.data);
			},
			error:function(error){
				console.log(error);	
			}
		});		
	}
	getTypeAllApi();
	
	
	//今日推荐接口
	function getTodayContent(){
		$.ajax({

			type:"post",
	
			url:ajaxUrl+"/10201040",

			data:{
				token : currentToken,
				jobId : getTimeMs(),
				pageCurrent : pageCurrent
			},
			dataType:"json",
			success:function(data){
				//console.log("今日推送");
				//console.log(data);
				showYspList(data.data);
			},
			error:function(error){
				console.log(error);
			}

		});
	}
	getTodayContent();
	
	//学院分类列表遍历
	function showTypeList(arr) {
		var str = '';
		var dom = $('#list');
		
		dom.html('');
			
		if(typeof(arr) == "undefined" || !arr.length){
			//刷新初始化
			refData = 0;
			return;
		}			
		
		for(var i = 0 ; i < 7 ; i++){
			
			str =  str +
'				<li>'+
'					<a class="pro" href="articleList2.html?smallClassifyId=' + arr[i].smallClassifyId + '">'+
'						<img src="' + arr[i].picUrl + '"  />'+
'						<span>' + arr[i].smallClassifyName + '</span>'+
'					</a>'+
'				</li>'	
		}
		//加其他分类图标
		str = str + 
'				<li>'+
'					<a class="pro" href="articleDivision.html">'+
'						<img src="img/articleDivision/1.png"  />'+
'						<span>更多</span>'+
'					</a>'+
'				</li>'
		dom.append(str);	
		
		
		//去掉学院分类最右线
		var temp = 0;
		$("#list").find("li").each(function(){
			var index = $(this).index();
			if(index == 2*(temp+2)-1){
				temp = temp + 2;
				$(this).css("border-right","none");
			}
		});
	}
	
	//学院推荐列表
	function showYspList(arr) {
		var str = '';
		var dom = $('#yspList');
		
		if(pageCurrent <= 1)
			dom.html('');
		
		if(typeof(arr) == "undefined" || !arr.length){
			return;
		}			
		for(var i = 0 ; i < arr.length ; i++){
			var money = arr[i].eb3;
			if(money <= 0 || money == null || typeof(money)=="undefined"){
				money = "免费"
			}
			//type=4视频，type=5音频
			if(arr[i].type == 4){
				//classify=1单集，2合集，3广告
				str =  str +
				'<div class="middle-a"><p>'+arr[i].title+'</p></div>'
				+'<a href="newMultimedia.html?classify='+arr[i].classify+'&type='+arr[i].type+'&materialId='+arr[i].materialId+'">'
				+'<div class="video">'
				+'<img src="img/common/4.png" class="bofang"/>'
				+'<img src="'+arr[i].lookPicUrl+'" class="bg">'
				+'</div>'
				+'</a>'
				+'<div class="video-introduce">'
				+'共<span>'+arr[i].eb4+'</span>集'
				+'<span>'+arr[i].numRead+'</span>次播放'
				+'<span class="money">'+money+'</span>'
				+'</div>'
				+'<div class="bottom-hide"></div>'
			}else if(arr[i].type == 5){
				//classify=1单集，2合集，3广告
				str =  str +
				'<div class="middle-a"><p>'+arr[i].title+'</p></div>'
				+'<a href="newMultimedia.html?classify='+arr[i].classify+'&type='+arr[i].type+'&materialId='+arr[i].materialId+'">'
				+'<div class="video">'
				+'<img src="img/common/5.png" class="bofang"/>'
				+'<img src="'+arr[i].lookPicUrl+'" class="bg">'
				+'</div>'
				+'</a>'
				+'<div class="video-introduce">'
				+'共<span>'+arr[i].eb4+'</span>集'
				+'<span>'+arr[i].numRead+'</span>次播放'
				+'<span class="money">'+money+'</span>'
				+'</div>'
				+'<div class="bottom-hide"></div>'
			}
		}
		dom.append(str);		
		//刷新初始化
		refData = 0;
		pageCurrent = pageCurrent + 1;	
	}
	
	//下拉刷新
	var refData = 0;
	var pageCurrent = 1;
	$(window).scroll(function(){ 
		//获取滚动条滚动过的距离 
	    if($(document).scrollTop() >= $(document).height()-$(window).height()-200) {  
			//开始加载
			if(refData==0){
				refData = 1;
				getTodayContent();
			}
		}  
	})  
	//加载微信分享
	loadWeixinShare('');
});
