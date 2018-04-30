//Token整理
var currentToken = window.localStorage.getItem('token');//读取本地缓存
var newToken = getQueryString('token');//读取Url参数
if(typeof(newToken) != "undefined" && newToken != ''){//判断新参数是否传递
	currentToken = newToken;
	window.localStorage.setItem('token', newToken);
}
//要求用户授权登录
if(typeof(currentToken) == "undefined" || currentToken == '' || currentToken == null){//判断token是否有效
	//console.log(111);
	location.href = noTokenUrl;
}
