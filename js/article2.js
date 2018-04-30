$(function(){
	//当前页变量
	var classify = getQueryString('classify');
	var classifyId = getQueryString('classifyId');
	var materialId = getQueryString('materialId');
	var centreClassifyId = getQueryString('centreClassifyId');

	var base = new Base64(); 
	var smallClassifyName = base.decode(getQueryString('smallClassifyName'));
	var numApplaud = getQueryString('numApplaud');
	var numUser = getQueryString('numUser');
	var onlineTime = getQueryString('onlineTime');	
	
	//页面传参过来的点赞数和收藏数，发布时间,三级分类名称
	function changeBaseInfor() {
			$('#time').text(onlineTime.slice(0,10));
			$('#tip').text(smallClassifyName);
			$('#markNum').text(numUser);
			$('#likeNum').text(numApplaud);
	}
	
	//获取满屏高度，并设置html满屏颜色
	function setBgColor() {
		var height = $(document).height() + 'px';
		$('html').css('height',height);
		$('body').css('height',height);
	}
	
	
	//页面浏览数加+1接口
	function readNumberApi() {
		$.ajax({
			type:"post",
			url: ajaxUrl + "/10202033",
			data:{
				token : window.localStorage.getItem('token'),
				jobId : getTimeMs(),
				classifyId : classifyId,
				materialId : materialId
			},
			dataType:"json",
			success:function(data){
				//console.log(data);				
			},
			error:function(error){
				console.log(error);	
			}
		});			
	}
	
	//是否点赞
	function islikeApi() {
		$.ajax({
			type:"post",
			url: ajaxUrl + "/10202061",
			data:{
				token : window.localStorage.getItem('token'),
				jobId : getTimeMs(),
				materialId : materialId
			},
			dataType:"json",
			success:function(data){
				//console.log(data);
				if(data.data === '0'){
					$('#like .get').removeClass('dn');
				}
			},
			error:function(error){
				console.log(error);	
			}
		});			
	}	
	//点赞接口
	function tolikeApi() {
		$.ajax({
			type:"post",
			url: ajaxUrl + "/10202060",
			data:{
				token : window.localStorage.getItem('token'),
				jobId : getTimeMs(),
				materialId : materialId,
				classifyId : classifyId
			},
			dataType:"json",
			success:function(data){
				console.log(data);
			},
			error:function(error){
				console.log(error);	
			}
		});		
	}
	//是否收藏
	function isHaveApi() {
		$.ajax({
			type:"post",
			url: ajaxUrl + "/10202051",
			data:{
				token : window.localStorage.getItem('token'),
				jobId : getTimeMs(),
				materialId : materialId
			},
			dataType:"json",
			success:function(data){
				//console.log(data);	
				if(data.data === '0'){
					$('#mark .get').removeClass('dn');
				}				
			},
			error:function(error){
				console.log(error);	
			}
		});			
	}		
	//点击收藏接口
	function toHaveApi() {
		$.ajax({
			type:"post",
			url: ajaxUrl + "/10202050",
			data:{
				token : window.localStorage.getItem('token'),
				jobId : getTimeMs(),
				materialId : materialId
			},
			dataType:"json",
			success:function(data){
				console.log(data);				
			},
			error:function(error){
				console.log(error);	
			}
		});			
	}	
	//取消收藏接口
	function cancelHaveApi() {
		$.ajax({
			type:"post",
			url: ajaxUrl + "/10202052",
			data:{
				token : window.localStorage.getItem('token'),
				jobId : getTimeMs(),
				materialId : materialId
			},
			dataType:"json",
			success:function(data){
				console.log(data);				
			},
			error:function(error){
				console.log(error);	
			}
		});			
	}
	
	//文章详情接口
	function articleApi() {
		$.ajax({
			type:"post",
			url:ajaxUrl + "/10202030",
			data:{
				token : window.localStorage.getItem('token'),
				jobId : getTimeMs(),
				materialId : materialId
			},
			dataType:"json",
			success:function(data){
//				console.log(data);
				$('#title').text(data.data.title);
				$('#txt').html(data.data.synopsis);
				$('#poster').attr('poster',data.data.lookPicUrl);
				if(classify !== '2'){
					$('#mv').attr('src',data.data.materialUrl);
					//$('#poster').attr('poster',data.data.lookPicUrl);
					$('#title2').text(data.data.title);
					$('#mvImg').text(data.data.lookPicUrl);
				}				
			},
			error:function(error){
				console.log(error);	
			}
		});			
	}	

	//合集遍历方法
	function showCollectionList(arr) {
			var str = '';
			var dom = $('#mvList');
			
			dom.html('');
			
			if(!arr.length){
				return;
			}			
			
			for(var i = 0 ; i < arr.length ; i++){
				
				str =  str +
'						<li class="swiper-slide" data-mv="' + arr[i].materialUrl + '" data-poster="' + arr[i].lookPicUrl + '" data-title="' + arr[i].title + '" data-synopsis="' + arr[i].synopsis + '">'+
'							<img src="' + arr[i].lookPicUrl + '" class="liImg" />'+
'							<p>' + arr[i].title + '</p>'+
'						</li>'
			}
			dom.append(str);		
	}
	
	//合集列表接口
	function collectionListApi() {
		$.ajax({
			type:"post",
			url:ajaxUrl + "/10202031",
			data:{
				token : window.localStorage.getItem('token'),
				jobId : getTimeMs(),
				materialId : materialId
			},
			dataType:"json",
			success:function(data){
//				console.log(data);
				$('#mvNum').text(data.data.length);
				$('#mv').attr('src',data.data[0].materialUrl);
				//$('#poster').attr('poster',data.data[0].lookPicUrl);			
				showCollectionList(data.data);

				var swiper = new Swiper('.swiper-container', {
					slidesPerView: 3,
					spaceBetween: 30,
				});				

				//选择播放视频
				$('#mvList li').bind('click',function(){
					var mv = $(this).attr('data-mv');
					$('#mv').attr('src',mv);
					var poster = $(this).attr('data-poster');
					$('#poster').attr('poster',poster);
					
					var title = $(this).attr('data-title');
					$('#title').text(title);
					var synopsis = $(this).attr('data-synopsis');
					$('#txt').html(synopsis);				
				});				
			},
			error:function(error){
				console.log(error);	
			}
		});			
	}	

	//判断是否合集
	function judgeCollection() {
		if(classify === '2'){
			collectionListApi();
		}
	}
	
	//评论遍历方法
	function showCommentList(arr) {
			var str = '';
			var dom = $('#commentsBox');
			
			dom.html('');
			
			if(!arr.length){
				return;
			}			
			
			for(var i = 0 ; i < arr.length ; i++){
				var criticNickName = arr[i].criticNickName < 4 ? arr[i].criticNickName : arr[i].criticNickName.slice(0,3) + '...'				
				str =  str +
'				<li>'+
'					<div class="head">'+
'						<img src="' + arr[i].criticHeadUrl + '" />'+
'					</div>'+
'					<div class="comment">'+
'						<div class="name">'+'<strong>' + criticNickName + '</strong><span>' + arr[i].createTime.slice(0,16) + ' </span></div>'+
'						<p>' + arr[i].content + '</p>'+
'					</div>'+
'				</li>'
			}
			dom.append(str);		
	}
	//评论列表
	function commentListApi() {
		$.ajax({
			type:"post",
			url: ajaxUrl + "/10202071",
			data:{
				token : window.localStorage.getItem('token'),
				jobId : getTimeMs(),
				materialId : materialId
			},
			dataType:"json",
			success:function(data){
				//console.log(data);
				showCommentList(data.data);
			},
			error:function(error){
				console.log(error);	
			}
		});		
	}
	//添加评论api
	function commentAddApi(content) {
		$.ajax({
			type:"post",
			url: ajaxUrl + "/10202070",
			data:{
				token : window.localStorage.getItem('token'),
				jobId : getTimeMs(),
				materialId : materialId,
				content : content,
				commentType : '1'
			},
			dataType:"json",
			success:function(data){
				//console.log(data);
				$('#commentInput').val('');
				showAddPopup();
				commentListApi();
				scrollToEnd();
			},
			error:function(error){
				console.log(error);	
			}
		});		
	}	
	//显示评论成功弹窗
	function showAddPopup() {
		$('#popupSuccess').removeClass('dn');
		setTimeout(() => {
			$('#popupSuccess').addClass('dn');
		}, 2000);
	}
	//滚动到页面底部
	function scrollToEnd(){//滚动到底部
		var h = $(document).height()-$(window).height();
		$(document).scrollTop(h); 
	}
	
	//收藏功能
	$('#mark').bind('click',function(){
		var isHave = $('#mark .get').hasClass('dn');
		if(isHave){
			$('#mark .get').removeClass('dn');
			$('#markNum').text(parseInt($('#markNum').text())+1);
			toHaveApi();
		}else{
			$('#mark .get').addClass('dn');
			$('#markNum').text(parseInt($('#markNum').text())-1);
			cancelHaveApi();
		}
	});
	
	//点赞功能
	$('#like').bind('click',function(){
		var isHave = $('#like .get').hasClass('dn');
		if(isHave){
			$('#like .get').removeClass('dn');
			$('#likeNum').text(parseInt($('#likeNum').text())+1);
			tolikeApi();
		}else{
			//$('#like .get').addClass('dn');
		}
	});	
	
	//分享弹窗效果
	$('#share').bind('click',function(){
		$('#popupShare').removeClass('dn');
	});
	$('#shareSure').bind('click',function(){
		$('#popupShare').addClass('dn');
	});	
	
	//点击添加评论
	$('#send').bind('click',function(){
		var content = $('#commentInput').val();
		if(content === ''){
			return;
		}else{
			commentAddApi(content);
		}
	});
	
	
		//视频播放
	zymedia('video',{autoplay: true});	
	
	//第一次加载调用方法
	setBgColor();
	changeBaseInfor();
	readNumberApi();
	articleApi();
	
	islikeApi();
	isHaveApi();
	judgeCollection();
	commentListApi();	
});
