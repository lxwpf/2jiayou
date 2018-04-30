$(function(){
	//=====================公共变量====================
	var token = window.localStorage.getItem('token');		//获取缓存token,必传参数
	var materialId = "";									//当前页面
	var materialClassify = "";
	var realUrl = "https://p.2jiayou.com/9999601000";		//支付通道页面

	//设置支付路径
	function doPayAction() {
		payForm.action = realUrl;
		$('token').val(token);
		$('materialId').val(materialId);
		$('materialClassify').val(materialClassify);
		payForm.submit();
	}
	//第一次加载调用方法
	//doPayAction();
});
