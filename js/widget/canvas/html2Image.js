/**
 * Html内容转换为图像输出
 * @param fatherContent 图片显示区域的（原生的）DOM 对象
 * @param shareContent 需要截图的包裹的（原生的）DOM 对象
 * @returns
 */
/*
<div class="area">
	<!--转换区域-->
	<div class="bg" id="zh">
		<span class="xxx" id="xxx">ISHome</span>
		<span class="xxx" id="xxx">ISHome</span>
		<span class="xxx" id="xxx">ISHome</span>
	</div>
	<!--转换区域-->
</div>
 */
function html2Image(fatherContent, shareContent) {
    var width = shareContent.offsetWidth; //获取dom 宽度
    var height = shareContent.offsetHeight; //获取dom 高度
    var canvas = document.createElement("canvas"); //创建一个canvas节点
    var scale = 2; //定义任意放大倍数 支持小数
    canvas.width = width * scale; //定义canvas 宽度 * 缩放
    canvas.height = height * scale; //定义canvas高度 *缩放
    canvas.getContext("2d").scale(scale, scale); //获取context,设置scale 
    var opts = {
        scale: scale, // 添加的scale 参数
        canvas: canvas, //自定义 canvas
        // logging: true, //日志开关，便于查看html2canvas的内部执行流程
        width: width, //dom 原始宽度
        height: height,
        useCORS: true // 【重要】开启跨域配置
    };

    //调用第三方工具转换Html为canvas
    html2canvas(shareContent, opts).then(function (canvas) {
        var context = canvas.getContext('2d');
        // 【重要】关闭抗锯齿
        context.mozImageSmoothingEnabled = false;
        context.webkitImageSmoothingEnabled = false;
        context.msImageSmoothingEnabled = false;
        context.imageSmoothingEnabled = false;
        
        // 调用第三方工具转换canvas为图片
        //【重要】默认转化的格式为png,也可设置为其他格式
        var img = Canvas2Image.convertToJPEG(canvas, canvas.width, canvas.height);
        fatherContent.html('');
        fatherContent.append(img);

        $(img).css({
            "width": "100%",
            "height": "100%",
        });
    });
}