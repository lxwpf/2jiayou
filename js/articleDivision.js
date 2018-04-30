$(function(){
	//学院分类列表遍历
	function showTypeList(arr) {
			var str = '';
			var dom = $('#list');
			
			dom.html('');
			
			if(!arr.length){
				return;
			}			
			
			for(var i = 0 ; i < arr.length ; i++){				
				str =  str +
'				<li>'+
'					<a class="pro" href="articleList2.html?smallClassifyId=' + arr[i].smallClassifyId + '">'+
'						<img src="' + arr[i].picUrl + '"  />'+
'						<span>' + arr[i].smallClassifyName + '</span>'+
'					</a>'+
'				</li>'	
			}
			dom.append(str);
			
			//去除分类最右边的border-right: none;
			var temp = 0;
			$("#list").find("li").each(function(){
				var index = $(this).index();
				if(index == 2*(temp+2)-1){
					temp = temp + 2;
					$(this).css("border-right","none");
				}
			});
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
	
	
	//第一次加载
	getTypeAllApi();
	//加载微信分享
	loadWeixinShare('');
});