$(function(){
	//当前页变量
	var centreClassifyId = getQueryString('centreClassifyId');
	var smallClassifyId = '';
	
	//改变title名
	function changeTitle(arr) {
		for(var i=0 ; i<arr.length ; i++){
			if(arr[i].centreClassifyId === centreClassifyId){
				$("title").html(arr[i].centreClassifyName); 
			}
		}
	}
	
	//获取满屏高度，并设置html满屏颜色
	function setBgColor() {
		var height = $(document).height() + 'px';
		$('html').css('height',height);
		$('body').css('height',height);
	}




	//管家导航遍历方法
	function showCenterNav(arr) {
			var str = '';
			var dom = $('#tabs');
			
			dom.html('');
			
			if(!arr.length){
				return;
			}			
			for(var i = 0 ; i < 5 ; i++){			
				str =  str +
'				<li data-name="' + arr[i].smallClassifyId + '">'+
					arr[i].smallClassifyName	+
'				</li>'
			}
			dom.append(str);		
	}
	//管家导航2遍历方法
	function showCenterNav2(arr) {
			var str = '';
			var dom = $('#listBox');
			
			dom.html('');
			
			if(!arr.length){
				return;
			}			
			for(var i = 0 ; i < arr.length ; i++){			
				str =  str +
'				<li data-name="' + arr[i].smallClassifyId + '">'+
					arr[i].smallClassifyName	+
'				</li>'
			}
			dom.append(str);		
	}		
	//管家分类导航api
	function centerNavApi() {
		$.ajax({
			type:"post",
			url: ajaxUrl + "/10202010",
			data:{
				token : window.localStorage.getItem('token'),
				jobId : getTimeMs(),
				classifyId : centreClassifyId,
			},
			dataType:"json",
			success:function(data){
				console.log(data);
				showCenterNav(data.data);
				showCenterNav2(data.data);
				
				changeTitle(data.data);
				//点击全部	
				$('#all').bind('click',function(){
					$('#tabs li').removeClass('active');
					$('#listBox li').removeClass('active');
					$(this).addClass('active');
					$("title").html('全部');
					centerListApi();
				});			
				//点击导航显示部分
				$('#tabs li').bind('click',function(){
					var index = $(this).index();
										
					$('#all').removeClass('active');
					$('#listBox li').removeClass('active');
					$('#tabs li').removeClass('active');	
					
					$(this).addClass('active');
					if(index < 5){
						$('#listBox li').eq(index).addClass('active');
					}
					$("title").html($(this).text());
					smallClassifyId = $(this).attr('data-name');					
					centerListApi2(smallClassifyId);
				});	
				//点击导航隐藏部分
				$('#listBox li').bind('click',function(){
					var index = $(this).index();
					
					$('#popupList').addClass('dn');
					$('#all').removeClass('active');
					$('#listBox li').removeClass('active');
					$('#tabs li').removeClass('active');			
					$(this).addClass('active');
					if(index < 5){
						$('#tabs li').eq(index).addClass('active');
					}					
					$("title").html($(this).text());
					smallClassifyId = $(this).attr('data-name');
					centerListApi2(smallClassifyId);
				});					
			},
			error:function(error){
				console.log(error);	
			}
		});		
	}	


	//管家分类列表遍历
	function showCenterList(arr) {
		var str = '';
		var dom = $('#recommendList');
			
		if(pageCurrent <= 1)
			dom.html('');

		if(typeof(arr) == "undefined" || !arr.length){
			return;
		}
		
		for(var i = 0 ; i < arr.length ; i++){	
			var isVideo = arr[i].type == 4 ? ' ' : 'dn';
			var isMusic = arr[i].type == 5 ? ' ' : 'dn';
			
			var jumpTxt = arr[i].type == 4 ? 'newMultimedia.html' :
						  arr[i].type == 5 ? 'newMultimedia.html' :
											 'newArticle.html';

			var mUrl = jumpTxt + '?classify=' + arr[i].classify + '&materialId=' + arr[i].materialId + '&classifyId=' + arr[i].classifyId +'&centreClassifyId=' + arr[i].centreClassifyId + '&smallClassifyName=' + name + '&numApplaud=' + arr[i].numApplaud + '&numUser=' + arr[i].numUser + '&onlineTime=' + arr[i].onlineTime;

			str =  str +
'					<li>'+
'						<a class="passageImg" href="' + mUrl +'">'+
'							<img src="' + arr[i].lookPicUrl + '" class="pic"  />'+
'							<img src="img/common/4.png" class="video ' + isVideo + '" />'+
'							<img src="img/common/5.png" class="music ' + isMusic + '" />'+
'						</a>'+
'						<div class="passageTxt" onclick="javascript:location.href=\''+ mUrl +'\'">'+
'							<a class="headings" href="' + mUrl +'">' + arr[i].title + '</a>'+
'							<div class="infor">'+
'								<div class="read">阅读量 <span>' + arr[i].numRead + '</span></div>'+
'								<a class="type" href="articleList.html?centreClassifyId=' + arr[i].centreClassifyId + '">' + arr[i].centreClassifyName  + '</a>'+
'							</div>'+
'						</div>'+
'					</li>';
			
		}
		dom.append(str);			
		//刷新初始化
		refData = 0;
		pageCurrent = pageCurrent + 1;	
	}	
	//管家全部列表数据
	function centerListApi() {
		curType = 0;
		$.ajax({
			type:"post",
			url: ajaxUrl + "/10202020",
			data:{
				token : window.localStorage.getItem('token'),
				jobId : getTimeMs(),
				pageCurrent : pageCurrent,
				classifyId : centreClassifyId,
			},
			dataType:"json",
			success:function(data){
				console.log(data);
				showCenterList(data.data);
			},
			error:function(error){
				console.log(error);	
			}
		});		
	}
	//管家各个标签分类列表
	function centerListApi2(id) {
		pageCurrent = 1;
		curType = 1;
		$.ajax({
			type:"post",
			url: ajaxUrl + "/10202020",
			data:{
				token : window.localStorage.getItem('token'),
				jobId : getTimeMs(),
				pageCurrent : '1',
				classifyId : id,
			},
			dataType:"json",
			success:function(data){
				console.log(data);
				showCenterList(data.data);
			},
			error:function(error){
				console.log(error);	
			}
		});		
	}		
	
	
	//下拉刷新
	var curType = 0;
	var refData = 0;
	var pageCurrent = 1;
	$(window).scroll(function(){ 
		//获取滚动条滚动过的距离 
	    if($(document).scrollTop() >= $(document).height()-$(window).height()-200) {  
			//开始加载
			if(refData==0){
				refData = 1;
				if(curType==0)
				centerListApi();
				if(curType==1)
				centerListApi2(smallClassifyId);
			}
		}  
	})  

	
	
	
	//点击导航箭头，出现分类菜单
	$('#more').bind('click',function(){
		$('#popupList').removeClass('dn');
	});
	//关闭分类列表弹窗
	$('#close').bind('click',function(){
		$('#popupList').addClass('dn');
	});

	
	
	//第一次加载方法
	setBgColor();
	centerNavApi();
	centerListApi();
	//加载微信分享
	loadWeixinShare('');
});
