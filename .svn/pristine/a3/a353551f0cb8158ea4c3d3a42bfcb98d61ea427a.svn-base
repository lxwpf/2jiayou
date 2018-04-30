var index = 0; //当前答题进度
var sucess = 0; //正确数目
var changeLock = 0;

function selectOption(selIndex) {
	if(changeLock == 1)
		return;
	//跳转锁定
	changeLock = 1;
	console.log(selIndex);
	//判断用户选择内容
	if(selIndex != '') {
		//先判断是否正确
		if(examQues[index].answer === selIndex) {
			if(examQues[index].type == '1') {
				$('#option_val' + selIndex).css('color', '#FFFFFF');
				$('#option_res_right' + selIndex).removeClass("dn");
			} else if(examQues[index].type == '2') {
				$('#pic_res_right' + selIndex).removeClass("dn");
			}
			//计算分数
			sucess = sucess + 1;
		} else {
			if(examQues[index].type == '1') {
				$('#option_val' + examQues[index].answer).css('color', '#FFFFFF');
				$('#option_res_right' + examQues[index].answer).removeClass("dn");

				$('#option_val' + selIndex).css('color', '#FFFFFF');
				$('#option_res_error' + selIndex).removeClass("dn");
			} else if(examQues[index].type == '2') {
				$('#pic_res_right' + examQues[index].answer).removeClass("dn");
				
				$('#pic_res_error' + selIndex).removeClass("dn");
			}
		}
		//更新索引
		index = index + 1;
		setTimeout(loadExamOption, 2000);
	}
}

function loadExamOption() {
	if(index >= examQues.length){
		window.localStorage.setItem('sucess',sucess);
		location.href = '../examinationResult.html';
		return;
	}
	//初始化
	$('#qus_success').text(sucess);
	$('#qus_msg').text(examQues[index].msg);
	$('#qus_process').attr("src", examQues[index].process);
	$('#qus_title').text(examQues[index].title);
	$('#qus_describe').text(examQues[index].describe);

	//选项区域处理
	if(examQues[index].type == '1') {
		$('#item_pic').addClass("dn");
		$('#item_text').removeClass("dn");
		for(var i = 0; i < examQues[index].options.length; i++) {
			var optionItem = examQues[index].options[i];
			$('#option_no' + i).attr('src', '../img/examination/item/' + optionItem.pic);
			$('#option_res_right' + i).addClass("dn");
			$('#option_res_right' + i).addClass("dn");
			$('#option_res_error' + i).addClass("dn");
			$('#option_val' + i).css('color', '#3A67BA');
			$('#option_val' + i).text(optionItem.value);
		}
	} else if(examQues[index].type == '2') {
		$('#item_text').addClass("dn");
		$('#item_pic').removeClass("dn");
		for(var i = 0; i < examQues[index].options.length; i++) {
			var optionItem = examQues[index].options[i];
			$('#pic_no' + i).attr('src', '../img/examination/item/' + optionItem.pic);
			
			if(optionItem.meno==' '){
				$('#pic_meno_div' + i).addClass("dn");
			}else {
				$('#pic_meno' + i).text(optionItem.meno);
				$('#pic_meno_div' + i).removeClass("dn");
			}
			
			$('#pic_res_right' + i).addClass("dn");
			$('#pic_res_error' + i).addClass("dn");
			$('#pic_val' + i).attr('src', optionItem.value);
		}
	}

	//跳转锁定
	changeLock = 0;
}


$(function() {
	//=====================公共变量==================

	console.log(examQues);

	//加载考题
	//setTimeout(loadExamOption, 300);
	loadExamOption();
	
	
	//加载微信分享
	loadWeixinShare('3');
});