//进页面自动播放事件
function autoPlay(){
	document.getElementById("#mv").play();
}

//延迟显示
function showMessage(str){
	$(".showAlert").removeClass("dn");
	$(".showAlert span").text(str);
}

//延时隐藏
function hiddenMessage(){
	setTimeout(function(){
		$(".showAlert").addClass("dn");
	},1500);
}

//加载素材资源
var index_old = 0;
function loadMaterialUrl(index,materialUrl){
	//console.log(type);
	//console.log(materialUrl);
	//拦截失败情况
	if(typeof(type) == "undefined" || type == '' || type == '9'){
		return;
	}

	$('#li_'+index_old).removeClass("orange-color");
	index_old = index;
	$('#li_'+index).addClass("orange-color");

	//materialUrl = "https://staticpubg.shunwang.com/pubg/media/video1/movie480.webm";
	if(materialUrl == '')
		return;
	//判断购买状态
	if(index > 0 & isPay*1 > 0 && isBuy != '1'){
		$(".payAlert").removeClass("dn");
		//alert('请先购买本资源');
		return;
	}
	showMaterialUrl(materialUrl);
}
function showMaterialUrl(materialUrl){
	if(type == '5'){
		//console.log("展示图片播放音频");
		//展示图片播放音频
		try{
			$('#av').attr('src',materialUrl);
			$('#avDiv').removeClass("dn");
		}catch(e){
		}	
	}	
	else if(type == '4'){
		//console.log("播放视频");
		//播放视频
		try{
			$('#mv').attr('src',materialUrl);
			$('#mvDiv').removeClass("dn");	
		}catch(e){
		}	
	}
}

//定义全局变量
var isHave = "2";//1支持2没有
var isLike = "2";//1支持2没有

var isBuy = "2";//购买状态//1购买2没有
var isPay = "0";//支付金额

var classify = '0';//页面分类
var type='9';//素材类别

//自定义方法
$(function(){
	//全局变量
	classify = getQueryString('classify');//1单集，2合集，3广告
	type = getQueryString('type');;//1文字，2图片，3图文,4视频，5音频，6视频和音频
	//当前页变量
	var materialId = getQueryString('materialId');
	var classifyId = getQueryString('classifyId');
	var centreClassifyId = getQueryString('centreClassifyId');
	//var currentToken = testToken;

	//获取满屏高度，并设置html满屏颜色
	function setBgColor() {
		var height = $(document).height() + 'px';
		$('html').css('height',height);
		$('body').css('height',height);
	}

	//页面传参过来的点赞数和收藏数，发布时间,三级分类名称
	function changeBaseInfor() {
			//$('#time').text(onlineTime.slice(0,10));
			//$('#tip').text(smallClassifyName);
			//$('#markNum').text(numUser);
			//$('#likeNum').text(numApplaud);
	}
	
	//页面浏览数加+1接口
	function readNumberApi() {
		$.ajax({
			type:"post",
			url: ajaxUrl + "/10202033",
			data:{
				token : currentToken,
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
	function isLikeApi() {
		$.ajax({
			type:"post",
			url: ajaxUrl + "/10202061",
			data:{
				token : currentToken,
				jobId : getTimeMs(),
				materialId : materialId
			},
			dataType:"json",
			success:function(data){
				//console.log(isLike);
				//console.log(data);
				if(data.data === '0'){
					isLike = "1";
					$('#likeNum').text(data.message);
					$('#likeNum').addClass("orange-color");
					$('#dianzhanspan').addClass("orange-color");
					$('#dianzhanspan1').addClass("orange-color");
					$('#notdianzhan').addClass("dn");	
					$('#havedianzhan').removeClass("dn");	
				}
			},
			error:function(error){
				console.log(error);	
			}
		});			
	}	
	//点赞接口
	function toLikeApi() {
		$.ajax({
			type:"post",
			url: ajaxUrl + "/10202060",
			data:{
				token : currentToken,
				jobId : getTimeMs(),
				materialId : materialId,
				classifyId : classifyId
			},
			dataType:"json",
			success:function(data){
				//console.log(data);
				isLike = "1";
				$('#likeNum').text(parseInt($('#likeNum').text())+1);
				$('#likeNum').addClass("orange-color");
				$('#dianzhanspan').addClass("orange-color");
				$('#dianzhanspan1').addClass("orange-color");
				$('#notdianzhan').addClass("dn");	
				$('#havedianzhan').removeClass("dn");
				setTimeout(function(){
					showMessage("点赞成功");
					hiddenMessage();
				}, 800);
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
				token : currentToken,
				jobId : getTimeMs(),
				materialId : materialId
			},
			dataType:"json",
			success:function(data){
				//console.log(data);	
				if(data.data === '0'){
					isHave = "1";
					$('#shouchangspan').addClass("orange-color");
					$('#notshouchang').addClass("dn");	
					$('#haveshouchang').removeClass("dn");	
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
				token : currentToken,
				jobId : getTimeMs(),
				materialId : materialId
			},
			dataType:"json",
			success:function(data){
				//console.log(data);				
				isHave = "1";
				$('#shouchangspan').addClass("orange-color");
				$('#notshouchang').addClass("dn");	
				$('#haveshouchang').removeClass("dn");	
				setTimeout(function(){
					showMessage("收藏成功");
					hiddenMessage();
				}, 800);
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
				token : currentToken,
				jobId : getTimeMs(),
				materialId : materialId
			},
			dataType:"json",
			success:function(data){
				//console.log(data);		
				isHave = "2";
				$('#shouchangspan').removeClass("orange-color");
				$('#notshouchang').removeClass("dn");	
				$('#haveshouchang').addClass("dn");	
				setTimeout(function(){
					showMessage("取消收藏");
					hiddenMessage();
				}, 800);
			},
			error:function(error){
				console.log(error);	
			}
		});			
	}

	//文章字数过多自动换行
	function txtMore(str){
		var length = str.length;
		if(length < 106) {
			return
		} 
		var n = parseInt((length-106) / 10) === 0 ? 0.28 : (parseInt((length-106) / 10))*0.28;
		var height = (n+3.7333333333333334) + 'rem';
		//console.log(n)
		$('#music ul li').css({'height':height})
	}
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//文章详情接口
	function articleApi() {
		$.ajax({
			type:"post",
			url:ajaxUrl + "/10202030",
			data:{
				token : currentToken,
				jobId : getTimeMs(),
				classify : classify,
				materialId : materialId
			},
			dataType:"json",
			success:function(data){
				console.log(data);
				try{
					$(document).attr('title',data.data.title.slice(0,10));
				}catch(e){
					setTimeout(function(){
						showMessage("资源加载失败，请刷新页面！");
						hiddenMessage();
					}, 800);
					return;
				}
				type = data.data.type;
				$('#txt').html(data.data.synopsis);
				txtMore(data.data.synopsis);

				//销售价格------------------------------------------------------------------------------------
				isPay = data.data.price;
				//销售价格------------------------------------------------------------------------------------

				if(classify == '1'){
					//显示音频
					showMaterialUrl(data.data.materialUrl);
					//显示标题
					showMaterialTitle(data.data.materialUrl,data.data.title,data.data.eb3);
				}
				else if(classify == '2'){	
					collectionListApi();
				}
				isPayApi();
			},
			error:function(error){
				console.log(error);	
			}
		});			
	}		
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////

	//是否需要购买
	function isPayApi() {
		try{
			//判断是否收费
			if(isPay * 1 > 0){
				//显示购买
				$('#price').text(isPay);
				
				$('#gobuy').removeClass("dn");	
				$('#notbuy').addClass("dn");	
				
				isBuyApi();
			}
		}catch(e){
			alert(e);
			console.log(e);
		}
	}

	//判断是否合集
	function judgeCollection() {
		if(classify == '2'){
			collectionListApi();
		}else{
			console.log("不是合集");
		}
	}
//https://staticpubg.shunwang.com/pubg/media/video1/movie480.webm
	//合集列表接口
	function collectionListApi() {
		$.ajax({
			type:"post",
			url:ajaxUrl + "/10202031",
			data:{
				token : currentToken,
				jobId : getTimeMs(),
				materialId : materialId
			},
			dataType:"json",
			success:function(data){
				//console.log("合集====");
				//console.log(data);
				$('#mvNum').text(data.data.length);

				//显示合集列表	
				//$('#mvNum').text(data.data.length);
				//$('#poster').attr('src',data.data[0].lookPicUrl);
				showCollectionList(data.data);

				loadMaterialUrl(0,data.data[0].materialUrl)
			},
			error:function(error){
				console.log(error);	
			}
		});			
	}

	//合集遍历方法
	function showCollectionList(arr) {
			var str = '';
			var dom = $('#colList');
			
			dom.html('');
			
			if(!arr.length){
				return;
			}			
			
			//<li>
			//	<div class="xj-ul-title">(1)普洱茶是浇洒较大时的巴士的比较好</div>
			//	<div class="share-right">
			//		<img src="img/newMultimedia/share.png"/>
			//		<span>分享</span>
			//	</div>
			//</li>
			for(var i = 0 ; i < arr.length ; i++){				
				    str =  str +
'						<li id="li_'+ i +'" onclick="loadMaterialUrl(' + i + ',\''+arr[i].materialUrl+'\')">';
				if(i==0){
				    str =  str +
'						  <div class="xj-ul-title">' + arr[i].title  + '</div>';
				}else{
				    str =  str +
'						  <div class="xj-ul-title">' + arr[i].title  + '</div>';
				}
				    str =  str +
'						  <div class="share-right">' ;
//'						  <li class="swiper-slide" data-mv="' + arr[i].materialUrl + '" data-poster="' + arr[i].lookPicUrl + '" data-title="' + arr[i].title + '" data-synopsis="' + arr[i].synopsis + '">'+
				if(i==0){
				    str =  str +
'							<img src="img/newMultimedia/mf.png" class="liImg" />' + 
'							<span>&nbsp;</span>';
				}else{
				if(typeof(arr[i].eb3)=="undefined"||(arr[i].eb3)=="0"){ 
					str =  str +
'							<span>&nbsp;</span>';
				}else{
				    str =  str +
'							<span>￥' + arr[i].eb3 + '</span>';
				}
				    str =  str +
'						  </div>'
'						</li>';	
				}
				//console.log(str);	
			}
			dom.append(str);	
	}

	function showMaterialTitle(materialUrl,title,eb3){
		var str = '';
		var dom = $('#colList');
		
		dom.html('');
		
		str =  str +
'						<li id="li_0" onclick="loadMaterialUrl(0,\''+materialUrl+'\')">';
		str =  str +
'						  <div class="xj-ul-title">' + title  + '</div>';
		str =  str +
'						  <div class="share-right">' ;
		if(typeof(eb3)=="undefined"||(eb3)=="0"){ 
			str =  str +
'							<span>&nbsp;</span>';
		}else{
			str =  str +
'							<span>￥' + eb3 + '</span>';
		}
		str =  str +
'						  </div>'
'						</li>';	
		dom.append(str);	
	}


	//////////////////////////////////////////////////////////////////////////////


	//评论遍历方法
	function showCommentList(arr) {
			var str = '';
			var dom = $('#commentsBox');
			
			dom.html('');
			
			if(!arr.length){
				return;
			}			
			
			for(var i = 0 ; i < arr.length ; i++){
				var criticNickName = arr[i].criticNickName < 8 ? arr[i].criticNickName : arr[i].criticNickName.slice(0,8) + '...'				
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
				token : currentToken,
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
				token : currentToken,
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
		setTimeout(function(){
			showMessage("评论成功！");
			hiddenMessage();
		}, 800);
	}
	//滚动到页面底部
	function scrollToEnd(){//滚动到底部
		var h = $(document).height()-$(window).height();
		$(document).scrollTop(h); 
	}
	//////////////////////////////////////////////////////////////////////////////////////////////////
	//查询购买状态
	function isBuyApi(){
		$.ajax({
			type:"post",
			url: ajaxUrl + "/11202010",
			data:{
				token : window.localStorage.getItem('token'),
				jobId : getTimeMs(),
				materialId : materialId
			},
			dataType:"json",
			success:function(data){
				//console.log(data);
				if(data.data === '0'){
					isBuy = "1";
					$('#notbuy').addClass("dn");	
					$('#gobuy').addClass("dn");	
					$('#hadbuy').removeClass("dn");	
				}
			},
			error:function(error){
				console.log(error);	
			}
		});		
	}
	//////////////////////////////////////////////////////////////////////////////////////////////////
	//收藏功能
	$('#mark').bind('click',function(){
		if(isHave=="2"){
			$('#notshouchang').addClass("dn");	
			$('#haveshouchang').removeClass("dn");		
			toHaveApi();
		}else{
			$('#notshouchang').removeClass("dn");	
			$('#haveshouchang').addClass("dn");	
			cancelHaveApi();
		}
	});
	
	//点赞功能
	$('#like').bind('click',function(){
		console.log(isLike);	
		if(isLike=="2"){
			toLikeApi();
		}
	});	

	//购买资源
	/*$('#gobuy').bind('click',function(){
		if (confirm("此内容为收费内容，是否购买？")) {
			
			///////////////////以下内容保留////////////////////////////
			buyForm.classify.value = classify;
			buyForm.materialId.value = materialId;
			buyForm.token.value = currentToken;
			buyForm.action = orderUrl + "/9999601000";
			buyForm.submit();
			//////////////////////////////////////////////////////////
        }  
        else {  
        }  
	});	*/
	
	$('#gobuy').bind('click',function(){
		$('.payAlert').removeClass("dn");
	});	
	//立即购买
	$("#payRight").on("click",function(){
		buyForm.classify.value = classify;
		buyForm.materialId.value = materialId;
		buyForm.token.value = currentToken;
		buyForm.action = orderUrl + "/9999601000";
		buyForm.submit();
	});
	//我知道了
	$("#payLeft").on("click",function(){
		$('.payAlert').addClass("dn");
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

	//音乐播放
	//audiojs.events.ready(function() {
	//	var as = audiojs.createAll();
	//});
	//音乐播放
	
	//第一次加载调用方法
	setBgColor();
	changeBaseInfor();
	readNumberApi();
	articleApi();
	isLikeApi();
	isHaveApi();
	//judgeCollection();
	commentListApi();	

	//加载微信分享
	loadWeixinShare(materialId);

	////////////////////////////////////////////////////////////////////////////////////////////////////
	//选集点击
	$(".detail-left").on("click",function(){
		//选集改变样式
		$(".xj-img").attr("src","./img/newMultimedia/b-1-selected.png");
		$(".select-xj").addClass("orange-color");
		$(".select-xj").removeClass("black-color");
		$(".detail-left").removeClass("B2B2B2-background");
		$(".detail-left").addClass("white-background");
		//改变简介样式
		$(".jj-img").attr("src","./img/newMultimedia/synopsis.png");
		$(".detail-txt").addClass("black-color");
		$(".detail-middle").removeClass("white-background");
		$(".detail-middle").addClass("B2B2B2-background");
		//改变评论样式
		$(".pl-img").attr("src","./img/newMultimedia/a-1.png");
		$(".detail-pl").addClass("black-color");
		$(".detail-right").removeClass("white-background");
		$(".detail-right").addClass("B2B2B2-background");
		
		$(".xj-ul").removeClass("dn");
		if(!$(".text-indent").is(":hidden")){
			$(".text-indent").addClass("dn");
		}
		if(!$(".commentsBox").is(":hidden")){
			$(".commentsBox").addClass("dn");
		}
	});
	//简介点击
	$(".detail-middle").on("click",function(){
		//改变简介样式
		$(".jj-img").attr("src","./img/newMultimedia/synopsis-selected.png");
		$(".detail-txt").addClass("orange-color");
		$(".detail-txt").removeClass("black-color");
		$(".detail-middle").removeClass("B2B2B2-background");
		$(".detail-middle").addClass("white-background");
		//选集改变样式
		$(".xj-img").attr("src","./img/newMultimedia/b-1.png");
		$(".select-xj").addClass("black-color");
		$(".detail-left").removeClass("white-background");
		$(".detail-left").addClass("B2B2B2-background");
		//改变评论样式
		$(".pl-img").attr("src","./img/newMultimedia/a-1.png");
		$(".detail-pl").addClass("black-color");
		$(".detail-right").removeClass("white-background");
		$(".detail-right").addClass("B2B2B2-background");
		
		$(".text-indent").removeClass("dn");
		if(!$(".xj-ul").is(":hidden")){
			$(".xj-ul").addClass("dn");
		}
		if(!$(".commentsBox").is(":hidden")){
			$(".commentsBox").addClass("dn");
		}
	});
	//评论点击
	$(".detail-right").on("click",function(){
		//改变评论样式
		$(".pl-img").attr("src","./img/newMultimedia/a-1-selected.png");
		$(".detail-pl").addClass("orange-color");
		$(".detail-pl").removeClass("black-color");
		$(".detail-right").removeClass("B2B2B2-background");
		$(".detail-right").addClass("white-background");
		//选集改变样式
		$(".xj-img").attr("src","./img/newMultimedia/b-1.png");
		$(".select-xj").addClass("black-color");
		$(".detail-left").removeClass("white-background");
		$(".detail-left").addClass("B2B2B2-background");
		//改变简介样式
		$(".jj-img").attr("src","./img/newMultimedia/synopsis.png");
		$(".detail-txt").addClass("black-color");
		$(".detail-middle").removeClass("white-background");
		$(".detail-middle").addClass("B2B2B2-background");
		
		$(".commentsBox").removeClass("dn");
		if(!$(".xj-ul").is(":hidden")){
			$(".xj-ul").addClass("dn");
		}
		if(!$(".text-indent").is(":hidden")){
			$(".text-indent").addClass("dn");
		}
	});


});
