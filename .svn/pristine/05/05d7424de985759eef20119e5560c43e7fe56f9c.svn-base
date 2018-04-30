$(function(){
	var token = window.localStorage.getItem('token');		//获取缓存token,必传参数
	var realUrl = ajaxUrl;
	console.log(token);
	$.ajax({
		type: "post",
		url: realUrl+"/10502010",
		data: {
			token: token,
			jobId: getTimeMs(),
			pageCurrent: 1,
			pageLimit: 100
		},
		success: function(data){
			console.log(data);
			myCard(data.data.userCoupon);
		},
		error: function(data){
			console.log(data);
		}
	});
	
	//数据解析
	function myCard(arr){
		var myCard = $("#ul-myCard");		//会员卡ul
		var coupon = $("#ul-coupon");		//优惠卷
		var code = $("#ul-code");			//兑换码
		if(arr.length > 0){
			for (var i=0;i<arr.length;i++) {
				var activityType = arr[i].activityType;		//1000会员卡, 2000优惠券, 3000兑换码
				var cardName = arr[i].rewardName;
				var str = "";
				str = str +
						'<li><img src="favicon.ico" class="li-img">'+
						'<span>'+cardName+'</span>'+
						'<li>';
				myCard.append(str);
					
				myCard.html("");
				coupon.html("");
				code.html("");
				
				if(activityType == "1000"){
					myCard.append(str);
				}else if(activityType == "2000"){
					coupon.append(str);
				}else{
					code.append(str);
				}
			}
		}
	}
});
