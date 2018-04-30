$(function(){
	//Token整理
	var reallyToken = window.localStorage.getItem('token');
	var shareToken = getQueryString('token');
	if(typeof(shareToken) != "undefined" && shareToken != ''){
		window.localStorage.setItem('token',shareToken);
		
		reallyToken = shareToken;
	}

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
				token : reallyToken,
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
				token : reallyToken,
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
				token : reallyToken,
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
				token : reallyToken,
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
				token : reallyToken,
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
				token : reallyToken,
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
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//文章详情接口
	function articleApi() {
		$.ajax({
			type:"post",
			url:ajaxUrl + "/10202030",
			data:{
				token : reallyToken,
				jobId : getTimeMs(),
				materialId : materialId
			},
			dataType:"json",
			success:function(data){
				console.log(data);
				onlineTime = data.data.onlineTime;
				if(typeof(onlineTime)=="undefined"||onlineTime == '')
					onlineTime = data.data.updateTime;
				$('#time').text(onlineTime.slice(0,10));
				$('#title').text(data.data.title);
				$('#txt').html(data.data.content);
			},
			error:function(error){
				console.log(error);	
			}
		});			
	}	
	
	//推荐阅读遍历
	function showReadList(arr) {
			var str = '';
			var dom = $('#recommendList');
			
			dom.html('');
			
			if(!arr.length){
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
		  	
		  		var _title_ = arr[i].title
				if(_title_.length>18)
					_title_ = _title_.substring(0,18)+'...';
				str =  str +
'					<li>'+
'						<a class="passageImg" href="' + jumpTxt + '?classify=' + arr[i].classify + '&materialId=' + arr[i].materialId + '&classifyId=' + arr[i].classifyId +'&centreClassifyId=' + arr[i].centreClassifyId + '&smallClassifyName=' + name + '&numApplaud=' + arr[i].numApplaud + '&numUser=' + arr[i].numUser + '&onlineTime=' + arr[i].onlineTime +'">'+
'							<img src="' + arr[i].lookPicUrl + '" class="pic"  />'+
'							<img src="img/common/4.png" class="video ' + isVideo + '" />'+
'							<img src="img/common/5.png" class="music ' + isMusic + '" />'+
'						</a>'+
'						<div class="passageTxt">'+
'							<a class="headings" href="' + jumpTxt + '?classify=' + arr[i].classify + '&materialId=' + arr[i].materialId + '&classifyId=' + arr[i].classifyId +'&centreClassifyId=' + arr[i].centreClassifyId + '&smallClassifyName=' + name + '&numApplaud=' + arr[i].numApplaud + '&numUser=' + arr[i].numUser + '&onlineTime=' + arr[i].onlineTime +'">' + _title_ + '</a>'+
'							<div class="infor">'+
'								<div class="read">阅读量 <span>' + arr[i].numRead + '</span></div>'+
'							</div>'+
'						</div>'+
'					</li>'
			}
			dom.append(str);		
	}	
	//推荐阅读api
	function readApi() {

		if(typeof(centreClassifyId) == "undefined" || centreClassifyId == ''){
			return;
		}
		
		$.ajax({
			type:"post",
			url:ajaxUrl + "/10202040",
			data:{
				token : reallyToken,
				jobId : getTimeMs(),
				centreClassifyId : centreClassifyId
			},
			dataType:"json",
			success:function(data){
				//console.log(data);
				showReadList(data.data);
			},
			error:function(error){
				console.log(error);	
			}
		});			
	}	
	
	
	//广告aqpi
	function bannerApi() {
		$.ajax({
			type:"post",
			url: ajaxUrl + "/10301010",
			data:{
				token : reallyToken,
				jobId : getTimeMs(),
				adsenseId : '3'
			},
			dataType:"json",
			success:function(data){
				//console.log(data);
				//console.log(data.data[0].picUrl);
				try{
					$('#banner').attr('src',data.data[0].picUrl);
				}catch(e){}
			},
			error:function(error){
				console.log(error);	
			}
		});		
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
'						<div class="name">'+'<strong>' + criticNickName +'</strong><span>' + arr[i].createTime.slice(0,16) + ' </span></div>'+
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
				token : reallyToken,
				jobId : getTimeMs(),
				materialId : materialId
			},
			dataType:"json",
			success:function(data){
//				console.log(data);
				showCommentList(data.data);
			},
			error:function(error){
				console.log(error);	
			}
		});		
	}
	//添加评论api	
	var lock = 0;
	function commentAddApi(content) {

		if(lock === 0)
			lock = 1;
		else
			return;
			
		$.ajax({
			type:"post",
			url: ajaxUrl + "/10202070",
			data:{
				token : reallyToken,
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
				lock = 0;
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
	
	//第一次加载调用方法
	setBgColor();
	changeBaseInfor();
	readNumberApi();
	articleApi();
	
	islikeApi();
	isHaveApi();
	readApi();
	bannerApi();
	commentListApi();
	
	//加载微信分享
	loadWeixinShare(materialId);
	
});
