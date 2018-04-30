$(function(){
	//====================================公共变量======================================
	var items = null;									//分类数据
	var classifyIdList = new Array();					//兴趣ID数组
	var classifyNameList = new Array();					//兴趣name数组
	var token = window.localStorage.getItem('token');	//缓存token
	//====================================公共变量======================================
	//列表数据
	$.ajax({
		type:"post",
		url:ajaxUrl+"/10202010",
		data:{
			token : token,
			jobId : getTimeMs(),
			classifyId : '100000000'	//管家传100000000，学院200000000
		},
		dataType:"json",
		success:function(data){
			//分类数据
			items = data.data;
			console.log(items);
			for (var i = 0; i < items.length; i++) {
				//console.log(items[i].centreClassifyName);
				$('#type').append('<span class="noSelect">'+items[i].centreClassifyName+'</span>');
			}
		},
		error:function(error){
			console.log(error);
		}
	});
	
	//选中喜欢的内容
	$('#type').on('click','span',function(){
		/*$('#type span').addClass('noSelect').removeClass('selected');
		$(this).removeClass('noSelect').addClass('selected');*/
		var className = $(this).attr("class");
		if(className == "noSelect"){
			$(this).removeClass('noSelect').addClass('selected');
		}else{
			$(this).removeClass('selected').addClass('noSelect');
		}
	});		
	
	//下一页
	$("#nextPage").click(function(){
		//遍历兴趣爱好标签，获取class类为selected值的兴趣标签，将其text值和items数据进行对比
		//填充兴趣ID集合和兴趣名称集合
		$('#type span').each(function(){
			var className = $(this).attr("class");
			if(className == "selected"){
				var text = $(this).text();
				classifyNameList.push(text);
				//当前选中，遍历
				for(var i = 0; i < items.length; i++){
					if(items[i].centreClassifyName == text){
						classifyIdList.push(items[i].puk);
					}
				}
			}
		});
		//调接口，将用户兴趣提交后台
		$.ajax({
			type:"post",
			url:ajaxUrl+"/10102020",
			data:{
				token: token,
				jobId: getTimeMs(),
				classifyIdList: classifyIdList,
				classifyNameList: classifyNameList
			},
			success:function(data){
				console.log(data);
				window.location.href= 'housekeeper.html';
			},
			error:function(error){
				console.log(data);
				window.location.href= 'housekeeper.html';
			}
		});
	});
});
