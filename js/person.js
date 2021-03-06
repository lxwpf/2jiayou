$(function(){
	//=====================公共变量====================
	var token = window.localStorage.getItem('token');		//获取缓存token,必传参数
	var currentPage = 1;									//当前页面
	var limit = 10;											//每页多少条
	var realUrl = ajaxUrl;
	//================================================
	
	//跳收藏页
	$('#jumpCollection').bind('click',function(){
		window.location = 'myCollection.html';
	})
	
	//跳浏览历史
	$('#jumpHistory').bind('click',function(){
		window.location = 'browsingHistory.html';
	})
	
	//用户基本资料
	function getUserInfo(token){
		$.ajax({
			type: "post",
			url: realUrl+"/10401010",
			data: {
				token: token,
				jobId: getTimeMs()
			},
			success:function(data){
				console.log("用户基本资料");
				console.log(data);
				var userInfo = data.data;
				console.log(userInfo);
				if(userInfo != null){
					$('#phone').text(userInfo.phone);
					$('#nickName').text(userInfo.nickName);
					$('#vipLevel').text(userInfo.pv1);
					$('#gold').text(userInfo.pv2);
					if("" != userInfo.headPortraitUrl || null != userInfo.headPortraitUrl){
						$('#titleIcon').attr("src",userInfo.headPortraitUrl);
					}else{
						$('#titleIcon').attr("src","img/person/c-1.png");
					}
				}
			},
			error:function(error){
				console.log(data);
			}
		});
	}
	getUserInfo(token);
	
	//我的收藏
	function getMyStow(token,currentPage,limit){
		$.ajax({
			type: "post",
			url: realUrl+"/10401020",
			data: {
				token : token,
				jobId : getTimeMs(),
				pageCurrent : currentPage,
				pageLimit : limit
			},
			success: function(data){
				var items = data.data.pageListData;
				//console.log(items);
				if(items.length > 0){
					for(var i=0;i<items.length;i++){
						var imgUrl = items[i].lookPicUrl;
						var title = items[i].title;
						//articleType 4是视频，5是音频
						if(items[i].type == "4"){
							$('#stowContent').append("<li class='swiper-slide'><div class='video'></div><img src='"+imgUrl+"'class='liImg' />"+"<p>"+title+"</p></li>");
						}else if(items[i].type == "5"){
							$('#stowContent').append("<li class='swiper-slide'><div class='radio'></div><img src='"+imgUrl+"'class='liImg' />"+"<p>"+title+"</p></li>");
						}else{
							console.log(title);
							$('#stowContent').append("<li class='swiper-slide'><img src='"+imgUrl+"'class='liImg' />"+"<p>"+title+"</p></li>");
							/*$('#articleImg').attr('src',imgUrl);
							$('#articleTitle').text(title);*/
						}
					}

					var swiper = new Swiper('#wrapper .swiper-container', {
						slidesPerView: 3,
						spaceBetween: 30,
					});					
				}
			},
			error:function(error){
				console.log(error);
			}
		});
	}
	getMyStow(token,currentPage,limit);
	
	//浏览历史记录
	function getHistory(token,currentPage,limit){
		$.ajax({
			type:"post",
			url:realUrl+"/10401030",
			data:{
				token : token,
				jobId : getTimeMs(),
				pageCurrent : currentPage,
				pageLimit : limit
			},
			success:function(data){
				var historyList = data.data.pageListData;
				//console.log(historyList);
				//articleType = 4是视频，articleType = 5是音频，其它的都会有缩略图
				for(var i=0;i<historyList.length;i++){
					var imgUrl = historyList[i].lookPicUrl;			//缩略图url
					var title = historyList[i].title;				//title
					if(historyList[i].type == "4"){
						$('#historyContent').append("<li class='swiper-slide'><div class='video'></div><img src='"+imgUrl+"'class='liImg' />"+"<p>"+title+"</p></li>");
					}else if(historyList[i].type == "5"){
						$('#historyContent').append("<li class='swiper-slide'><div class='radio'></div><img src='"+imgUrl+"'class='liImg' />"+"<p>"+title+"</p></li>");
					}else{
						$('#historyContent').append("<li class='swiper-slide'><img src='"+imgUrl+"'class='liImg' />"+"<p>"+title+"</p></li>");
					}
				}

					
				var swiper2 = new Swiper('#wrapper11 .swiper-container', {
					slidesPerView: 3,
					spaceBetween: 30,
				});					
			},
			error:function(error){
				console.log(error);
			}
		});
	}
	getHistory(token,currentPage,limit);
	
	
	//加载微信分享
	loadWeixinShare('');
	
	/*签到*/
	$(".right-userInfo").on("click",function(){
		$.ajax({
			type:"post",
			url:realUrl+"/10501080",
			data:{
				token : token,
				jobId : getTimeMs(),
				activityId : "1"
			},
			success:function(data){
				console.log(data);
			},
			error:function(data){
				console.log(data);
			}
		});
	});
});
