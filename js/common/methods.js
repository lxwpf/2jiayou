//是否是手机号 是 返回 true
function judgePhone(str) {
	let reg = /^0*(13|15|18|17|14)\d{9}$/;
	return reg.test(str);
}

//空格检验
function checkSpaceCharacter(val){
	var reg = /\s/;
	if(reg.exec(val)==null){
		return true;
	}else{
		return false;
	}
}

//判断密码是否符合要求  是 返回true
function judgePassword(str) {
	var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
	return reg.test(str);
}


//发送验证码
function countdownTime(t,dom) {
	var m = t;
	var infor = document.getElementById(dom);
	infor.innerHTML = m + '秒后重试';
	var timer = setInterval(function(){
        if (m === 0) {
        	clearTimeout(timer)
            infor.innerHTML = '重新发送';
            return;
    	}
        m--;
        infor.innerHTML = m + '秒后重试';
	},1000);
}

//获取当前时间的毫秒
function getTimeMs() {
	var t = new Date();
	return t.getTime();
}


//文字信息处理超过110加...
function changeStr(txt) {
	if(txt.length > 110){
        //return txt.slice(0,106)+'...'
        return txt
	}else{
		return txt
	}
}
function changeStr2(txt,n) {
	if(txt.length > n){
        return txt.slice(0,n)+'...'
	}else{
		return txt
	}
}


//获取url相应参数值
//function getQueryString(name) {
//	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
//	var r = window.location.search.substr(1).match(reg);
//	if(r != null) return unescape(r[2]);
//	return null;
//}
function getQueryString(name) {
	var url = location.search; //获取url中"?"符后的字串 
	var theRequest = new Object();
	if(url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for(var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
		}
	}
	return theRequest[name];
}

//base64加密
/** 
* 
*  Base64 encode / decode 
* 
*  @author haitao.tu 
*  @date   2010-04-26 
*  @email  tuhaitao@foxmail.com 
* 
*/  
   
function Base64() {  
   
    // private property  
    _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";  
   
    // public method for encoding  
    this.encode = function (input) {  
        var output = "";  
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;  
        var i = 0;  
        input = _utf8_encode(input);  
        while (i < input.length) {  
            chr1 = input.charCodeAt(i++);  
            chr2 = input.charCodeAt(i++);  
            chr3 = input.charCodeAt(i++);  
            enc1 = chr1 >> 2;  
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);  
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);  
            enc4 = chr3 & 63;  
            if (isNaN(chr2)) {  
                enc3 = enc4 = 64;  
            } else if (isNaN(chr3)) {  
                enc4 = 64;  
            }  
            output = output +  
            _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +  
            _keyStr.charAt(enc3) + _keyStr.charAt(enc4);  
        }  
        return output;  
    }  
   
    // public method for decoding  
    this.decode = function (input) {  
        var output = "";  
        var chr1, chr2, chr3;  
        var enc1, enc2, enc3, enc4;  
        var i = 0;  
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");  
        while (i < input.length) {  
            enc1 = _keyStr.indexOf(input.charAt(i++));  
            enc2 = _keyStr.indexOf(input.charAt(i++));  
            enc3 = _keyStr.indexOf(input.charAt(i++));  
            enc4 = _keyStr.indexOf(input.charAt(i++));  
            chr1 = (enc1 << 2) | (enc2 >> 4);  
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);  
            chr3 = ((enc3 & 3) << 6) | enc4;  
            output = output + String.fromCharCode(chr1);  
            if (enc3 != 64) {  
                output = output + String.fromCharCode(chr2);  
            }  
            if (enc4 != 64) {  
                output = output + String.fromCharCode(chr3);  
            }  
        }  
        output = _utf8_decode(output);  
        return output;  
    }  
   
    // private method for UTF-8 encoding  
    _utf8_encode = function (string) {  
        string = string.replace(/\r\n/g,"\n");  
        var utftext = "";  
        for (var n = 0; n < string.length; n++) {  
            var c = string.charCodeAt(n);  
            if (c < 128) {  
                utftext += String.fromCharCode(c);  
            } else if((c > 127) && (c < 2048)) {  
                utftext += String.fromCharCode((c >> 6) | 192);  
                utftext += String.fromCharCode((c & 63) | 128);  
            } else {  
                utftext += String.fromCharCode((c >> 12) | 224);  
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);  
                utftext += String.fromCharCode((c & 63) | 128);  
            }  
   
        }  
        return utftext;  
    }  
   
    // private method for UTF-8 decoding  
    _utf8_decode = function (utftext) {  
        var string = "";  
        var i = 0;  
        var c = c1 = c2 = 0;  
        while ( i < utftext.length ) {  
            c = utftext.charCodeAt(i);  
            if (c < 128) {  
                string += String.fromCharCode(c);  
                i++;  
            } else if((c > 191) && (c < 224)) {  
                c2 = utftext.charCodeAt(i+1);  
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));  
                i += 2;  
            } else {  
                c2 = utftext.charCodeAt(i+1);  
                c3 = utftext.charCodeAt(i+2);  
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));  
                i += 3;  
            }  
        }  
        return string;  
    }  
} 




//发送验证码
function countdownTime(t,dom) {
	var m = t;
	var infor = document.getElementById(dom);
	infor.innerHTML = m + '秒后重试';
	var timer = setInterval(function(){
        if (m === 0) {
        	clearTimeout(timer)
            infor.innerHTML = '重新发送';
            $('.validata a').css('color','#0092ee').attr('id','sendCode');
            return m;
    	}
        m--;
        infor.innerHTML = m + '秒后重试';
        $('#sendCode').css('color','#CBCBCB').removeAttr('id');
	},1000);
}

