//直方图控件，参数依次为id，父节点id，宽度，高度，X轴名称，X轴数据，Y轴名称，Y轴数据，是否显示Y负半轴
function Histogram(id, parentId, width, height, xName, xData, yName, yData, isNag) {
	var privateThis = this;
	this.id = id;
	this.parentId = parentId;
	this.width = width;
	this.height = height;
	//X轴上数据的名称
	this.xName = xName;
	//X轴上的数据
	this.xData = xData;
	//Y轴上数据的名称
	this.yName = yName;
	//Y轴上的数据
	this.yData = yData;
	this.isNag = isNag;

	//X轴上显示标签的宽度
	this.xLabelWidth = 0;
	//X轴上显示标签的高度
	this.xLabelHeight = 0;
	//Y轴上显示标签的宽度
	this.yLabelWidth = 40;
	//Y轴上显示标签的高度
	this.yLabelHeight = 12;
	//X轴名称宽度
	this.xNameWidth = 30;
	//Y轴名称高度
	this.yNameHeight = 20;
	//直方图的宽度
	this.hisWidth = this.width - this.yLabelWidth - this.xNameWidth;
	//直方图的高度
	this.hisHeight = this.height - this.xLabelHeight - this.yNameHeight;
	//直方图上半部分高度
	this.posHeight = this.isNag ? this.hisHeight / 2 : this.hisHeight;
	//直方图下半部分高度
	this.nagHeight = this.hisHeight - this.posHeight;

	//Y轴分段数
	this.yCount = 4;
	//正数颜色
	this.posColor = "#4f81bc";
	//负数颜色
	this.nagColor = "#c0504e";
	//零颜色
	this.zeroColor = "#BABABA";
	
	//背景色
	this.backColor = "#ffffff";
	//前景色
	this.color = "#000000";
	//边框颜色
	this.borderColor = "#000000";

	this.main = document.getElementById(this.parentId);

	this.create = function() {
		
		var oldHistogram = document.getElementById("container_" + this.id);
		if (oldHistogram != null) {
			this.main.removeChild(oldHistogram);
		}
		//创建直方图容器
		var container = createElementByAttribute("div", "container_" + this.id, this.width, this.height);
//		container.style.backgroundColor = this.backColor;
		container.style.paddingTop = this.yNameHeight + "px";
		container.style.marginBottom = "20px";

		//创建直方图节点
		var histogram = createElementByAttribute("div", this.id, this.hisWidth, this.hisHeight);
		histogram.style.marginRight = this.xNameWidth + "px";
		histogram.style.marginLeft = this.yLabelWidth + "px";
		//创建直方图上半部分节点
		var positive = createElementByAttribute("div", this.id + "_positive", this.hisWidth, this.posHeight);
		positive.style.borderBottom = this.borderColor + " 1px solid";
		positive.style.borderLeft = this.borderColor + " 1px solid";
		//创建直方图下半部分节点
		var nagative = createElementByAttribute("div", this.id + "_nagative", this.hisWidth, this.nagHeight);
		nagative.style.borderLeft = this.borderColor + " 1px solid";
		nagative.style.fontSize = "1px";

		histogram.appendChild(positive);
		histogram.appendChild(nagative);
		container.appendChild(histogram);
		this.main.appendChild(container);
		
		//调整X、Y轴，向外伸出10像素
		this.hisWidth -= 10;
		this.posHeight -= 10;

		//方块的个数
		var xCount = xData.length;
		//方快的宽度
		var xUnitWidth = Math.floor(this.hisWidth / xCount) - 5;
		var divNagative = document.getElementById(this.id + "_nagative");
		//直方图上半部分左下角坐标
		var posLeft = getLeft(divNagative) + 1;
		var posBottom = getTop(divNagative) - 1;
		//直方图下半部分左下角坐标
		var nagLeft = getLeft(divNagative) + 1;
		var nagBottom = getTop(divNagative);
		
		var max = getMax();
		//Y轴最高点的数据值
		var yDataHigh = getYDataHigh(max);
		//画直方图上半部分辅助线
		for (var i = 0; i < this.yCount; i++) {
			var area = createElementByAttribute("div", this.id + "_posArea_" + i, this.hisWidth, Math.floor(this.posHeight / this.yCount) - 1);
			area.style.borderTop = this.borderColor + " 1px dashed";
			area.style.position = "absolute";
			area.style.left = posLeft + "px";
			area.style.top = posBottom - Math.floor(this.posHeight / this.yCount) * (i + 1) + 1 + "px";
			document.getElementById(this.id + "_positive").appendChild(area);
		}

		//画直方图下半部分辅助线
		if (this.isNag)
		{
			for (var i = 0; i < this.yCount; i++) {
				var area = createElementByAttribute("div", this.id + "_nagArea_" + i, this.hisWidth, Math.floor(this.nagHeight / this.yCount) - 1);
				area.style.borderTop = this.borderColor + " 1px dashed";
				area.style.position = "absolute";
				area.style.left = nagLeft + "px";
				area.style.top = nagBottom + Math.floor(this.posHeight / this.yCount) * (i + 1) - 1 + "px";
				document.getElementById(this.id + "_positive").appendChild(area);
			}
		}
		
//		//创建Y轴上半部分标签
//		for (var i = 0; i < this.yCount; i++) {
//			var yLabel = createElementByAttribute("div", this.id + "_yPosLabel_" + i, this.yLabelWidth, this.yLabelHeight);
//			var yUnitAreaValue = Math.floor(yDataHigh / this.yCount * 100) / 100;
//			yLabel.style.position = "absolute";
//			yLabel.style.left = getLeft(document.getElementById(this.id + "_posArea_" + i)) - this.yLabelWidth - 5 + "px";
//			yLabel.style.top = getTop(document.getElementById(this.id + "_posArea_" + i)) - Math.floor(this.yLabelHeight / 2) + "px";
//			yLabel.style.textAlign = "right";
//			yLabel.style.color = this.color;
//			var yLabelText = document.createTextNode(yUnitAreaValue * (i + 1));
//			yLabel.appendChild(yLabelText);
//			container.appendChild(yLabel);
//		}
//
//		//创建Y轴下半部分标签
//		if (this.isNag)
//		{
//			for (var i = 0; i < this.yCount; i++) {
//				var yLabel = createElementByAttribute("div", this.id + "_yNagLabel_" + i, this.yLabelWidth, this.yLabelHeight);
//				var yUnitAreaValue = Math.floor(yDataHigh / this.yCount * 100) / 100;
//				yLabel.style.position = "absolute";
//				yLabel.style.left = getLeft(document.getElementById(this.id + "_nagArea_" + i)) - this.yLabelWidth - 5 + "px";
//				yLabel.style.top = getTop(document.getElementById(this.id + "_nagArea_" + i)) - Math.floor(this.yLabelHeight / 2) + "px";
//				yLabel.style.textAlign = "right";
//				yLabel.style.color = this.color;
//				var yLabelText = document.createTextNode(yUnitAreaValue * (i + 1) * (-1));
//				yLabel.appendChild(yLabelText);
//				container.appendChild(yLabel);
//			}
//		}

		//创建0标签
		var yLabel = createElementByAttribute("div", this.id + "_yZeroLabel", this.yLabelWidth, this.yLabelHeight);
		yLabel.style.position = "absolute";
		yLabel.style.left = getLeft(document.getElementById(this.id + "_nagative")) - this.yLabelWidth - 5 + "px";
		yLabel.style.top = getTop(document.getElementById(this.id + "_nagative")) - Math.floor(this.yLabelHeight / 2) - 1 + "px";
		yLabel.style.textAlign = "right";
		yLabel.style.color = this.color;
		var yLabelText = document.createTextNode("0");
		yLabel.appendChild(yLabelText);
		container.appendChild(yLabel);

        for(i = 0;i < xData.length; i++){
            //创建X轴上数据名称标签ｉ
            var xLabel = createElementByAttribute("div", this.id + "_xLabel" + i, this.xNameWidth, 40);
            xLabel.style.position = "absolute";
            xLabel.style.left = posLeft + (xUnitWidth + 10) * i+ "px";
            xLabel.style.top = getTop(document.getElementById(this.id + "_nagative")) + "px";
            xLabel.style.color = this.color;
            var xLabelText = document.createTextNode(xData[i]);
            xLabel.appendChild(xLabelText);
            container.appendChild(xLabel);
        }

		//创建X轴上数据名称标签
		var xNameLabel = createElementByAttribute("div", this.id + "_xName", this.xNameWidth, 40);
		xNameLabel.style.position = "absolute";
		xNameLabel.style.left = getLeft(document.getElementById(this.id + "_nagative")) + document.getElementById(this.id + "_nagative").offsetWidth + "px";
		xNameLabel.style.top = getTop(document.getElementById(this.id + "_nagative")) - 6 + "px";
		xNameLabel.style.color = this.color;
		var xNameLabelText = document.createTextNode(this.xName);
		xNameLabel.appendChild(xNameLabelText);
		container.appendChild(xNameLabel);

		//创建Y轴上数据名称标签
		var yNameLabel = createElementByAttribute("div", this.id + "_yName", this.hisWidth, this.yNameHeight);
		yNameLabel.style.position = "absolute";
		yNameLabel.style.left = getLeft(document.getElementById(this.id + "_nagative")) - 20 - 20 + "px";
		yNameLabel.style.textAlign = "left";
		yNameLabel.style.top = getTop(document.getElementById(this.id + "_positive")) - this.yNameHeight + 5 + "px";
		yNameLabel.style.color = this.color;
		yNameLabel.style.fontSize = "16px";
		yNameLabel.style.color = "green";
		yNameLabel.style.marginBottom = "10px";
		var yNameLabelText = document.createTextNode(this.yName);
		yNameLabel.appendChild(yNameLabelText);
		container.appendChild(yNameLabel);

        var yNameLabel2 = createElementByAttribute("div", this.id + "_yName", this.hisWidth, this.yNameHeight);
        yNameLabel2.style.position = "absolute";
        yNameLabel2.style.left = getLeft(document.getElementById(this.id + "_nagative")) - 20 - 20 + "px";
        yNameLabel2.style.textAlign = "left";
        yNameLabel2.style.top = getTop(document.getElementById(this.id + "_positive")) + this.hisHeight + "px";
        yNameLabel2.style.color = this.color;
        yNameLabel2.style.fontSize = "16px";
        yNameLabel2.style.color = "red";
        yNameLabel2.style.marginBottom = "10px";
        var yNameLabelText2 = document.createTextNode("危险");
        yNameLabel2.appendChild(yNameLabelText2);
        container.appendChild(yNameLabel2);

		//Y轴上数据1个单位的像素数
		var pixPerUnit = this.posHeight / yDataHigh;

		for (var i = 0; i < xCount; i++) {
			var blockHeight = Math.floor(pixPerUnit * Math.abs(this.yData[i]));
			var block = createElementByAttribute("div", this.id + "_block_" + i, Math.floor(0.9 * xUnitWidth), blockHeight);
			block.style.position = "absolute";
			block.style.fontSize = "1px";
			if (!this.isNag) {
				this.yData[i] = Math.abs(this.yData[i]);
			}
            var delta = 5;
            if(xCount == 12 && i > 0&& i%2 == 0 ){
                delta =  8 * i;
            }else if(xCount == 12 && i > 0 && i%2 == 1){
                delta = 8*(i - 1);
            }else if(xCount == 12){
                delta = 5 * i;
            }
            if(xCount == 10 && i > 0&& i%2 == 0 ){
                delta =  8 * i;
            }else if(xCount == 10 && i > 0 && i%2 == 1){
                delta = 8*(i - 1);
            }else if(xCount == 10){
                delta = 5 * i;
            }
			if (this.yData[i] > 0) {
				block.style.left = posLeft + (xUnitWidth) * i + delta + "px";
				block.style.top = posBottom - blockHeight + "px";
				block.style.backgroundColor = this.posColor;
				positive.appendChild(block);
			}
			else if (this.yData[i] < 0) {
				block.style.left = nagLeft + (xUnitWidth) * i+delta + "px";
				block.style.top = nagBottom + "px";
				block.style.backgroundColor = this.nagColor;
				nagative.appendChild(block);
			}
			else {
				block.style.left = posLeft + (xUnitWidth) * i+delta + "px";
				block.style.height = "3px";
				block.style.top = (posBottom - 1) + "px";
				block.style.backgroundColor = this.zeroColor;
				positive.appendChild(block);
			}
		}
	};

	//根据参数创建节点
	function createElementByAttribute(tag, id, width, height) {
		var elem = document.createElement(tag);
		elem.setAttribute("id", id);
		elem.style.width = width + "px";
		elem.style.height = height + "px";
		return elem;
	}

	//取得节点左上角X轴坐标
	function getLeft(elem) {
		var elemLeft = 0;
		while (elem) {
			elemLeft += elem.offsetLeft;
			elem = elem.offsetParent;
		}
		return elemLeft;
	}

	//取得节点左上角Y轴坐标
	function getTop(elem) {
		var elemTop = 0;
		while (elem) {
			elemTop += elem.offsetTop;
			elem = elem.offsetParent;
		}
		return elemTop;
	}

	//计算Y轴上数据的最大值
	function getMax() {
		var max = 0;
		
		if (privateThis.yData != null && privateThis.yData.length > 0)
		{

			max = privateThis.yData[0];
			for (var i = 1; i < privateThis.yData.length; i++) {
				var tempAbs = Math.abs(eval(privateThis.yData[i]));
				max = max > tempAbs ? max : tempAbs;
			}
		}
		return max;
	}

	//计算Y轴最高点的数据值
	function getYDataHigh(max) {
		var digit = getDigit(max);
		return Math.floor(Math.ceil(max / Math.pow(10, digit)) * Math.pow(10, digit) * 100) / 100;
	}

	//计算数据的位数
	function getDigit(value) {
		var digit = 0;
		var tempValue = value * 100;
		while ((tempValue /= 10) > 1)
		{
			digit++;
		}
		return digit -= 2;
	}
}