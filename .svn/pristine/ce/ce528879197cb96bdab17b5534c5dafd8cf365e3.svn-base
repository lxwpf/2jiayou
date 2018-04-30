$(function(){
	//获取满屏高度，并设置html满屏颜色
	function setBgColor() {
		var height = $(document).height() + 'px';
		$('html').css('height',height);
		$('body').css('height',height);
	}




	//遍历我的收藏
	function showList(arr) {
			var str = '';
			var dom = $('#recommendList');
			
			if(!arr.length){
				return;
			}
			
			dom.html('');
			
			for(var i = 0 ; i < arr.length ; i++){
				var isVideo = arr[i].type == 4 ? ' ' : 'dn';
				var isMusic = arr[i].type == 5 ? ' ' : 'dn';
				
				var jumpTxt = arr[i].type == 4 ? 'newMultimedia.html' :
				              arr[i].type == 5 ? 'newMultimedia.html' :
				                                 'newArticle.html';

		  	var base = new Base64(); 
		  	var name = base.encode(arr[i].smallClassifyName);				                                 
				
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
				
				//console.log(str);
			}
			dom.append(str);	
	}
	
	
	//我的收藏api
	function myCollectionApi() {
		$.ajax({
			type:"post",
			url: ajaxUrl + "/10401020",
			data:{
				jobId : getTimeMs(),
				token : window.localStorage.getItem('token'),
				pageCurrent : '1',
				pageLimit : '100'					
			},
			dataType:"json",
			success:function(data){
				console.log(data);
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
				showList(data.data.pageListData)
			},
			error:function(error){
				console.log(error);	
			}
		});		
	}


	
	//第一次加载
	setBgColor();	
	myCollectionApi();
	//加载微信分享
	loadWeixinShare('');
});
