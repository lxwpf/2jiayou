$(function(){
		//判断是否新老用户并获取token
		function judgeUser() {
			if(getQueryString('token')){
				window.localStorage.setItem('token',getQueryString('token'));			
			}else{
				location.href = noTokenUrl;
			}
			if(getQueryString('flag') === '0'){ //flag 0  老用户
				location.href = jumpHousekeeper;
			}else{
				location.href = jumpGuiding;
			}	
		}
		judgeUser();	
});
