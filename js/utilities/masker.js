/**
 * 抽象格式化类
 */
function AbstractMasker() {};

AbstractMasker.prototype.format = function(obj) {
	if (obj == null)
		return null;

	var fObj = this.formatArgument(obj);
	return this.innerFormat(fObj);
};

/**
 * 统一被格式化对象结构
 *
 * @param obj
 * @return
 */
AbstractMasker.prototype.formatArgument = function(obj) {

};

/**
 * 格式化
 *
 * @param obj
 * @return
 */
AbstractMasker.prototype.innerFormat = function(obj) {

};

/**
 * 拆分算法格式化虚基类
 */
AbstractSplitMasker.prototype = new AbstractMasker;

function AbstractSplitMasker() {};
AbstractSplitMasker.prototype.elements = new Array;
AbstractSplitMasker.prototype.format = function(obj) {
	if (obj == null)
		return null;

	var fObj = this.formatArgument(obj);
	return this.innerFormat(fObj);
};

/**
 * 统一被格式化对象结构
 *
 * @param obj
 * @return
 */
AbstractSplitMasker.prototype.formatArgument = function(obj) {
	return obj;
};

/**
 * 格式化
 *
 * @param obj
 * @return
 */
AbstractSplitMasker.prototype.innerFormat = function(obj) {
	if (obj == null || obj == "")
		return new FormatResult(obj);
	this.doSplit();
	var result = "";
	//dingrf 去掉concat合并数组的方式，换用多维数组来实现 提高效率
	result = this.getElementsValue(this.elements, obj);

	return new FormatResult(result);
};

/**
 * 合并多维数组中的elementValue
 * @param {} element
 * @param {} obj
 * @return {}
 */
AbstractSplitMasker.prototype.getElementsValue = function(element, obj) {
	var result = "";
	if (element instanceof Array) {
		for (var i = 0; i < element.length; i++) {
			result = result + this.getElementsValue(element[i], obj);
		}
	} else {
		if (element.getValue)
			result = element.getValue(obj);
	}
	return result;
};

AbstractSplitMasker.prototype.getExpress = function() {

};

AbstractSplitMasker.prototype.doSplit = function() {
	var express = this.getExpress();
	if (this.elements == null || this.elements.length == 0)
		this.elements = this.doQuotation(express, this.getSeperators(), this.getReplaceds(), 0);
};


/**
 * 处理引号
 *
 * @param express
 * @param seperators
 * @param replaced
 * @param curSeperator
 * @param obj
 * @param result
 */
AbstractSplitMasker.prototype.doQuotation = function(express, seperators, replaced, curSeperator) {
	if (express.length == 0)
		return null;
	var elements = new Array();
	var pattern = new RegExp('".*?"', "g");
	var fromIndex = 0;
	var result;
	do {
		result = pattern.exec(express);
		if (result != null) {
			var i = result.index;
			var j = pattern.lastIndex;
			if (i != j) {
				if (fromIndex < i) {
					var childElements = this.doSeperator(express.substring(fromIndex, i), seperators, replaced, curSeperator);
					if (childElements != null && childElements.length > 0) {
						//						elements = elements.concat(childElements);
						elements.push(childElements);
					}
				}
			}
			elements.push(new StringElement(express.substring(i + 1, j - 1)));
			fromIndex = j;
		}
	}
	while (result != null);

	if (fromIndex < express.length) {
		var childElements = this.doSeperator(express.substring(fromIndex, express.length), seperators, replaced, curSeperator);
		if (childElements != null && childElements.length > 0)
		//			elements = elements.concat(childElements);
			elements.push(childElements);
	}
	return elements;
};

/**
 * 处理其它分隔符
 *
 * @param express
 * @param seperators
 * @param replaced
 * @param curSeperator
 * @param obj
 * @param result
 */
AbstractSplitMasker.prototype.doSeperator = function(express, seperators, replaced, curSeperator) {
	if (curSeperator >= seperators.length) {
		var elements = new Array;
		elements.push(this.getVarElement(express));
		return elements;
	}

	if (express.length == 0)
		return null;
	var fromIndex = 0;
	var elements = new Array();
	var pattern = new RegExp(seperators[curSeperator], "g");
	var result;
	do {
		result = pattern.exec(express);
		if (result != null) {
			var i = result.index;
			var j = pattern.lastIndex;
			if (i != j) {
				if (fromIndex < i) {
					var childElements = this.doSeperator(express.substring(fromIndex, i), seperators, replaced, curSeperator + 1);
					if (childElements != null && childElements.length > 0)
					//						elements = elements.concat(childElements);
						elements.push(childElements);
				}

				if (replaced[curSeperator] != null) {
					elements.push(new StringElement(replaced[curSeperator]));
				} else {
					elements.push(new StringElement(express.substring(i, j)));
				}
				fromIndex = j;
			}
		}
	}
	while (result != null);

	if (fromIndex < express.length) {
		var childElements = this.doSeperator(express.substring(fromIndex, express.length), seperators, replaced, curSeperator + 1);
		if (childElements != null && childElements.length > 0)
		//			elements = elements.concat(childElements);
			elements.push(childElements);
	}
	return elements;
};


/**
 * 地址格式
 */
AddressMasker.prototype = new AbstractSplitMasker;

function AddressMasker(formatMeta) {
	this.update(formatMeta);
};

AddressMasker.prototype.update = function(formatMeta) {
	this.formatMeta = u.extend({}, AddressMasker.DefaultFormatMeta, formatMeta)
}

AddressMasker.prototype.getExpress = function() {
	return this.formatMeta.express;
};

AddressMasker.prototype.getReplaceds = function() {
	return [this.formatMeta.separator];
};

AddressMasker.prototype.getSeperators = function() {
	return ["(\\s)+?"];
};

AddressMasker.prototype.getVarElement = function(express) {
	var ex = {};

	if (express == ("C"))
		ex.getValue = function(obj) {
			return obj.country;
		};


	if (express == ("S"))
		ex.getValue = function(obj) {
			return obj.state;
		};


	if (express == ("T"))
		ex.getValue = function(obj) {
			return obj.city;
		};


	if (express == ("D"))
		ex.getValue = function(obj) {
			return obj.section;
		};


	if (express == ("R"))
		ex.getValue = function(obj) {
			return obj.road;
		};

	if (express == ("P"))
		ex.getValue = function(obj) {
			return obj.postcode;
		};

	if (typeof(ex.getValue) == undefined)
		return new StringElement(express);
	else
		return ex;
};

AddressMasker.prototype.formatArgument = function(obj) {
	return obj;
};

/**
 * <b> 数字格式化  </b>
 *
 * <p> 格式化数字
 *
 * </p>
 *
 * Create at 2009-3-20 上午08:50:32
 *
 * @author bq
 * @since V6.0
 */
NumberMasker.prototype = new AbstractMasker;
NumberMasker.prototype.formatMeta = null;

/**
 *构造方法
 */
function NumberMasker(formatMeta) {
	this.update(formatMeta);
};

NumberMasker.prototype.update = function(formatMeta) {
	this.formatMeta = u.extend({}, NumberMasker.DefaultFormatMeta, formatMeta)
}

/**
 *格式化对象
 */
NumberMasker.prototype.innerFormat = function(obj) {
	var dValue, express, seperatorIndex, strValue;
	dValue = obj.value;
	if (dValue > 0) {
		express = this.formatMeta.positiveFormat;
		strValue = dValue + '';
	} else if (dValue < 0) {
		express = this.formatMeta.negativeFormat;
		strValue = (dValue + '').substr(1, (dValue + '').length - 1);
	} else {
		express = this.formatMeta.positiveFormat;
		strValue = dValue + '';
	}
	seperatorIndex = strValue.indexOf('.');
	strValue = this.setTheSeperator(strValue, seperatorIndex);
	strValue = this.setTheMark(strValue, seperatorIndex);
	var color = null;
	if (dValue < 0 && this.formatMeta.isNegRed) {
		color = "FF0000";
	}
	return new FormatResult(express.replaceAll('n', strValue), color);

};
/**
 *设置标记
 */
NumberMasker.prototype.setTheMark = function(str, seperatorIndex) {
	var endIndex, first, index;
	if (!this.formatMeta.isMarkEnable)
		return str;
	if (seperatorIndex <= 0)
		seperatorIndex = str.length;
	first = str.charCodeAt(0);
	endIndex = 0;
	if (first == 45)
		endIndex = 1;
	index = seperatorIndex - 3;
	while (index > endIndex) {
		str = str.substr(0, index - 0) + this.formatMeta.markSymbol + str.substr(index, str.length - index);
		index = index - 3;
	}
	return str;
};
NumberMasker.prototype.setTheSeperator = function(str, seperatorIndex) {
	var ca;
	if (seperatorIndex > 0) {
		ca = NumberMasker.toCharArray(str);
		//ca[seperatorIndex] = NumberMasker.toCharArray(this.formatMeta.pointSymbol)[0];
		ca[seperatorIndex] = this.formatMeta.pointSymbol;
		str = ca.join('');
	}
	return str;
};
/**
 * 将字符串转换成char数组
 * @param {} str
 * @return {}
 */
NumberMasker.toCharArray = function(str) {
	var str = str.split("");
	var charArray = new Array();
	for (var i = 0; i < str.length; i++) {
		charArray.push(str[i]);
	}
	return charArray;
};


/**
 *默认构造方法
 */
NumberMasker.prototype.formatArgument = function(obj) {
	var numberObj = {};
	numberObj.value = obj;
	return numberObj;
};

/**
 * 货币格式
 */
CurrencyMasker.prototype = new NumberMasker;
CurrencyMasker.prototype.formatMeta = null;

function CurrencyMasker(formatMeta) {
	this.update(formatMeta);
};

CurrencyMasker.prototype.update = function(formatMeta) {
	this.formatMeta = u.extend({}, CurrencyMasker.DefaultFormatMeta, formatMeta)
}

/**
 * 重载格式方法
 * @param {} obj
 * @return {}
 */
CurrencyMasker.prototype.innerFormat = function(obj) {
	if(!obj.value) {
		return {value: ""};
	}
	var fo = (new NumberMasker(this.formatMeta)).innerFormat(obj);
	fo.value = this.formatMeta.curSymbol  +  fo.value; //fo.value.replace("$", this.formatMeta.curSymbol);
	return fo;
};


PercentMasker.prototype = new NumberMasker;

function PercentMasker(formatMeta) {
	this.update(formatMeta)
};

PercentMasker.prototype.update = function(formatMeta) {
	this.formatMeta = u.extend({}, NumberMasker.DefaultFormatMeta, formatMeta)
}


PercentMasker.prototype.formatArgument = function(obj) {
	return obj;
};

PercentMasker.prototype.innerFormat = function(value) {
	var val = "";
	if (value != "") {
		var obj = (new NumberMasker(this.formatMeta)).innerFormat({value:value}).value;
		// 获取obj保留几位小数位,obj小数位-2为显示小数位
		var objStr = String(obj);
		var objPrecision = objStr.length - objStr.indexOf(".") - 1;
		var showPrecision = objPrecision - 2;
		if (showPrecision < 0) {
			showPrecision = 0;
		}
		val = parseFloat(obj) * 100;
		val = (val * Math.pow(10, showPrecision) / Math.pow(10, showPrecision)).toFixed(showPrecision);
		val = val + "%";
	}
	return {
		value: val
	};
};


/**
 * 将结果输出成HTML代码
 * @param {} result
 * @return {String}
 */
function toColorfulString(result) {
	var color;
	if (!result) {
		return '';
	}
	if (result.color == null) {
		return result.value;
	}
	color = result.color;
	return '<font color="' + color + '">' + result.value + '<\/font>';
};

/**
 * 格式解析后形成的单个格式单元
 * 适用于基于拆分算法的AbstractSplitFormat，表示拆分后的变量单元
 */
StringElement.prototype = new Object();

function StringElement(value) {
	this.value = value;
};
StringElement.prototype.value = "";

StringElement.prototype.getValue = function(obj) {
	return this.value;
};
/**
 *格式结果
 */
FormatResult.prototype = new Object;
/**
 *默认构造方法
 */
function FormatResult(value, color) {
	this.value = value;
	this.color = color;
};

NumberMasker.DefaultFormatMeta = {
	isNegRed: true,
	isMarkEnable: true,
	markSymbol: ",",
	pointSymbol: ".",
	positiveFormat: "n",
	negativeFormat: "-n"
}

CurrencyMasker.DefaultFormatMeta = u.extend({}, NumberMasker.DefaultFormatMeta, {
	//curSymbol: "",
	positiveFormat: "n",
	negativeFormat: "-n"
})


AddressMasker.defaultFormatMeta = {
	express: "C S T R P",
	separator: " "
};


u.AddressMasker = AddressMasker;
u.NumberMasker = NumberMasker;
u.CurrencyMasker = CurrencyMasker;
u.PercentMasker = PercentMasker;