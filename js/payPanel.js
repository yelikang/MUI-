/*==================================================
 Copyright 立子
 qq:530331059
 ==================================================*/
(function() {
	window.payPanel = {
		/**
		 * 显示输入面板，指定输入完成后的回调事件和点击取消的回调时间
		 * @param {Object} _inputOverFn
		 * @param {Object} _cancelFn
		 */
		showPanel: function(_inputOverFn, _cancelFn) {
			//输入完成后的回调
			panelObj.inputOverFn = _inputOverFn;
			//取消后的回调
			panelObj.cancelFn = _cancelFn;

			document.getElementsByClassName("pays")[0].style.display = "block";
			this.isShow = true;
		},
		/**
		 * 关闭输入面板
		 */
		closePanel: function() {
			document.getElementsByClassName("pays")[0].style.display = "none";
			panelObj.clearAll();
			this.isShow = false;
		},
		isShow:false
	}
	//输入面板的对象及其所有方法
	var panelObj = {
		//输入面板内容
		template: "<div class='payPanel'><div class='pass'><ul><li></li><li></li><li></li><li></li><li></li><li></li></ul></div><div class='inputPanel'><div><ul><li><a data-value='1'>1</a></li><li><a data-value='2'>2</a></li><li><a data-value='3'>3</a></li><li><a data-value='4'>4</a></li><li><a data-value='5'>5</a></li><li><a data-value='6'>6</a></li><li><a data-value='7'>7</a></li><li><a data-value='8'>8</a></li><li><a data-value='9'>9</a></li><li class='cancel'><a data-value='cancel'>取消</a></li><li><a data-value='0'>0</a></li><li><a data-value='delete'>删除</a></li></ul></div></div></div>",
		//初始化面板，将面板添加到页面
		init: function() {
			var div = document.createElement("div");
			div.className = "pays";
			div.innerHTML = this.template;
			document.body.appendChild(div);
			this.addEvent();
		},
		//输入的密码值
		inputVal: "",
		//添加键盘点击事件
		addEvent: function() {
			var inputLi = document.getElementsByClassName("inputPanel")[0].getElementsByTagName("a");
			for(var i = 0, len = inputLi.length; i < len; i++) {
				var ele = inputLi[i];
				ele.addEventListener("touchstart", function(e) {
					e.preventDefault();
					var value = this.getAttribute("data-value");
					if(value == "cancel") {
						//取消支付
						panelObj.clearAll();
						payPanel.closePanel();
						panelObj.cancelFn!=undefined?panelObj.cancelFn():"";

					} else if(value == "delete") {
						//删除
						var len = panelObj.inputVal.length;
						panelObj.inputVal = panelObj.inputVal.substr(0, len - 1);
						panelObj.clearInputContent(len - 1);

					} else {
						if(panelObj.inputVal.length >= 6) return;
						panelObj.inputVal += value;
						//设置输入框内容
						panelObj.setInputContent();
						if(panelObj.inputVal.length == 6) {
							//延迟2毫秒,保证用户可以看到输入了第六位
							setTimeout(function(){
								console.log("panelObj.inputVal:"+panelObj.inputVal);
								panelObj.inputOverFn!=undefined?panelObj.inputOverFn(panelObj.inputVal):"";
								panelObj.clearAll();
							},200)
							
						}

					}

				})
			}
		},
		//给6个输入款填充内容
		setInputContent: function() {
			var index = panelObj.inputVal.length - 1;
			var passLi = document.getElementsByClassName("pass")[0].getElementsByTagName("li");
			passLi[index].className = " i-circle";
		},
		//给指定的输入款取消内容
		clearInputContent: function(_index) {
			if(_index<0)return;
			var passLi = document.getElementsByClassName("pass")[0].getElementsByTagName("li");
			passLi[_index].className = "";
		},
		//清除所有输入款内容
		clearAll: function() {
			this.inputVal = "";
			var passLi = document.getElementsByClassName("pass")[0].getElementsByTagName("li");
			for(var i = 0, len = passLi.length; i < len; i++) {
				passLi[i].className = "";
			}
		},

	}

	panelObj.init();

})(window)