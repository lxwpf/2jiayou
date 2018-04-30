$(function(){
	//轮播banner遍历
	function showBannerList(arr) {
			var str = '';
			var dom = $('#swiper');
			
			dom.html('');
			
			if(!arr.length){
				return;
			}			
			
			for(var i = 0 ; i < arr.length ; i++){
				
				str =  str +
'	      <div class="swiper-slide">'+
'	      	<img src="'+ arr[i].picUrl +'"  />'+
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
//				console.log(data);
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



	
	
	//学院分类列表遍历
	function showTypeList(arr) {
			var str = '';
			var dom = $('#list');
			
			dom.html('');
			
			if(!arr.length){
				return;
			}			
			
			for(var i = 0 ; i < 7 ; i++){
				
				str =  str +
'				<li>'+
'					<a class="pro" href="articleList2.html?smallClassifyId=' + arr[i].smallClassifyId + '">'+
'						<img src="' + arr[i].picUrl + '"  />'+
'						<h5>' + arr[i].smallClassifyName + '</h5>'+
'					</a>'+
'				</li>'	
			}
			//加其他分类图标
			str = str + 
'				<li>'+
'					<a class="pro" href="articleDivision.html">'+
'						<img src="img/articleDivision/1.png"  />'+
'						<h5>全部</h5>'+
'					</a>'+
'				</li>'
			dom.append(str);		
	}
	//学院分类列表api	
	function getTypeAllApi() {
		$.ajax({
			type:"post",
			url: ajaxUrl + "/10202010",
			data:{
				token : window.localStorage.getItem('token'),
				jobId : getTimeMs(),
				classifyId : '200110000'
			},
			dataType:"json",
			success:function(data){
//				console.log(data);
//				console.log(data.data[0].smallClassifyId);
//				console.log(data.data[0].smallClassifyName);
				showTypeList(data.data);
			},
			error:function(error){
				console.log(error);	
			}
		});		
	}




	
	//猜你喜欢遍历
	function labelList(arr) {
			if(!arr.length){
				return;
			}
			var str = '';
			var dom = $('#recommendList');
			
			dom.html('');
			for(var i = 0 ; i < 4 ; i++){
				var jumpTxt = arr[i].type == 4 ? 'article2.html' :
				              arr[i].type == 5 ? 'article3.html' :
				                                 'article.html';				
				str =  str +
'				<li>'+
'					<a href="' + jumpTxt + '?classify=' + arr[i].classify + '&materialId=' + arr[i].materialId + '&classifyId=' + arr[i].classifyId +'&centreClassifyId=' + arr[i].centreClassifyId + '&smallClassifyName=' + name + '&numApplaud=' + arr[i].numApplaud + '&numUser=' + arr[i].numUser + '&onlineTime=' + arr[i].onlineTime +'">'+
'						<img src="' + arr[i].lookPicUrl + '"  />'+
'						<h5>' + arr[i].title.slice(0,6) + '</h5>'+						
'					</a>'+
'				</li>'		
			}
			dom.append(str);		
	}
	function labelListApi(id) {
		$.ajax({
			type:"post",
			url: ajaxUrl + "/10202020",
			data:{
				token : window.localStorage.getItem('token'),
				jobId : getTimeMs(),
				pageCurrent : 1,
				classifyId : id
			},
			dataType:"json",
			success:function(data){
//				console.log(data);	
//				console.log(data.data[0].classify);//是否合集
//				console.log(data.data[0].type);//什么类别
//				console.log(data.data[0].lookPicUrl);//封面
//				console.log(data.data[0].title);//标题
//				console.log(data.data[0].materialId);//素材ID
//				console.log(data.data[0].classifyId);//分类流水ID
				labelList(data.data);
			},
			error:function(error){
				console.log(error);	
			}
		});		
	}
	
	//精品推荐遍历
	function labelList2(arr) {
			var str = '';
			var dom = $('#recommendList2');
			
			dom.html('');
			
			if(!arr.length){
				return;
			}			
			
			for(var i = 0 ; i < 3 ; i++){
				var jumpTxt = arr[i].type == 4 ? 'article2.html' :
				              arr[i].type == 5 ? 'article3.html' :
				                                 'article.html';				
				str =  str +
'				<li>'+
'						<a href="' + jumpTxt + '?classify=' + arr[i].classify + '&materialId=' + arr[i].materialId + '&classifyId=' + arr[i].classifyId +'&centreClassifyId=' + arr[i].centreClassifyId + '&smallClassifyName=' + name + '&numApplaud=' + arr[i].numApplaud + '&numUser=' + arr[i].numUser + '&onlineTime=' + arr[i].onlineTime +'">'+
'							<img src="' + arr[i].lookPicUrl + '"  />'+					
'						</a>'+			
'					</li>'		
			}
			dom.append(str);		
	}
	function labelList2Api(id) {
		$.ajax({
			type:"post",
			url: ajaxUrl + "/10202020",
			data:{
				token : window.localStorage.getItem('token'),
				jobId : getTimeMs(),
				pageCurrent : 1,
				classifyId : id
			},
			dataType:"json",
			success:function(data){
//				console.log(data);	
//				console.log(data.data[0].classify);//是否合集
//				console.log(data.data[0].type);//什么类别
//				console.log(data.data[0].lookPicUrl);//封面
//				console.log(data.data[0].title);//标题
//				console.log(data.data[0].materialId);//素材ID
//				console.log(data.data[0].classifyId);//分类流水ID
				labelList2(data.data);
			},
			error:function(error){
				console.log(error);	
			}
		});		
	}
	
	//时代情怀遍历
	function labelList3(arr) {
			if(!arr.length){
				return;
			}
			var str = '';
			var dom = $('#recommendList3');
			
			dom.html('');
			for(var i = 0 ; i < 4 ; i++){
				var jumpTxt = arr[i].type == 4 ? 'article2.html' :
				              arr[i].type == 5 ? 'article3.html' :
				                                 'article.html';				
				str =  str +
'				<li>'+
'					<a href="' + jumpTxt + '?classify=' + arr[i].classify + '&materialId=' + arr[i].materialId + '&classifyId=' + arr[i].classifyId +'&centreClassifyId=' + arr[i].centreClassifyId + '&smallClassifyName=' + name + '&numApplaud=' + arr[i].numApplaud + '&numUser=' + arr[i].numUser + '&onlineTime=' + arr[i].onlineTime +'">'+
'						<img src="' + arr[i].lookPicUrl + '"  />'+
'						<h5>' + arr[i].title.slice(0,6) + '</h5>'+						
'					</a>'+
'				</li>'
			}
			dom.append(str);		
	}
	function labelList3Api(id) {
		$.ajax({
			type:"post",
			url: ajaxUrl + "/10202020",
			data:{
				token : window.localStorage.getItem('token'),
				jobId : getTimeMs(),
				pageCurrent : 1,
				classifyId : id
			},
			dataType:"json",
			success:function(data){
//				console.log(data);	
//				console.log(data.data[0].classify);//是否合集
//				console.log(data.data[0].type);//什么类别
//				console.log(data.data[0].lookPicUrl);//封面
//				console.log(data.data[0].title);//标题
//				console.log(data.data[0].materialId);//素材ID
//				console.log(data.data[0].classifyId);//分类流水ID
				labelList3(data.data);
			},
			error:function(error){
				console.log(error);	
			}
		});		
	}	
	//中华风采遍历
	function labelList4(arr) {
			var str = '';
			var dom = $('#recommendList4');
			
			dom.html('');
			
			if(!arr.length){
				return;
			}			
			
			for(var i = 0 ; i < 4 ; i++){
				var jumpTxt = arr[i].type == 4 ? 'article2.html' :
				              arr[i].type == 5 ? 'article3.html' :
				                                 'article.html';				
				str =  str +
'				<li>'+
'						<a href="' + jumpTxt + '?classify=' + arr[i].classify + '&materialId=' + arr[i].materialId + '&classifyId=' + arr[i].classifyId +'&centreClassifyId=' + arr[i].centreClassifyId + '&smallClassifyName=' + name + '&numApplaud=' + arr[i].numApplaud + '&numUser=' + arr[i].numUser + '&onlineTime=' + arr[i].onlineTime +'">'+
'							<img src="' + arr[i].lookPicUrl + '"  />'+					
'						</a>'+			
'					</li>'
			}
			dom.append(str);		
	}
	function labelList4Api(id) {
		$.ajax({
			type:"post",
			url: ajaxUrl + "/10202020",
			data:{
				token : window.localStorage.getItem('token'),
				jobId : getTimeMs(),
				pageCurrent : 1,
				classifyId : id
			},
			dataType:"json",
			success:function(data){
//				console.log(data);	
//				console.log(data.data[0].classify);//是否合集
//				console.log(data.data[0].type);//什么类别
//				console.log(data.data[0].lookPicUrl);//封面
//				console.log(data.data[0].title);//标题
//				console.log(data.data[0].materialId);//素材ID
//				console.log(data.data[0].classifyId);//分类流水ID
				labelList4(data.data);
			},
			error:function(error){
				console.log(error);	
			}
		});		
	}	
	//猜你喜欢，精品推荐，时代情怀，中华风采运营分类id获取
	function getLabelApi() {
		$.ajax({
			type:"post",
			url: ajaxUrl + "/10202010",
			data:{
				token : window.localStorage.getItem('token'),
				jobId : getTimeMs(),
				classifyId : '200120000'
			},
			dataType:"json",
			success:function(data){
//				console.log(data);
//				console.log(data.data[0].smallClassifyId);
//				console.log(data.data[0].smallClassifyName);
//				console.log(data.data[1].smallClassifyId);
//				console.log(data.data[1].smallClassifyName);
//				console.log(data.data[2].smallClassifyId);
//				console.log(data.data[2].smallClassifyName);
//				console.log(data.data[3].smallClassifyId);
//				console.log(data.data[3].smallClassifyName);	
				
				labelListApi(data.data[0].smallClassifyId);
				labelList2Api(data.data[1].smallClassifyId);
				labelList3Api(data.data[2].smallClassifyId);
				labelList4Api(data.data[3].smallClassifyId);
			},
			error:function(error){
				console.log(error);	
			}
		});		
	}




	//第一次加载调用
	bannerApi();
	getTypeAllApi();
	getLabelApi();
});
