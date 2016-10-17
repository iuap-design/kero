var fs = require('fs');
var path = require('path');

var filePath = getResolvePath('CHANGELOG.md');

fs.exists(filePath,function(exist) {
	if(exist){
		fs.readFile(filePath,function(err,d){
			if(err){
				console.log('read err:' + filePath);
			}else{
				
				var bStr = d.toString();
				
				// 针对每个a标签进行循环
				var aArr = bStr.split('<a');
				var nStr = '';
				for(var i in aArr){
					if(i > 0){
						var baseStr = '<a' + aArr[i];
						baseStr = sortFun(baseStr);
						nStr += baseStr;
					}
				}
				fs.writeFile(filePath, nStr, function(err){
					if(err){
						console.log('write err');
					}else{
						console.log('changeLog write success');
					}
				})
				
			}
		});
	}
})


function sortFun(baseStr){
	var beginIndex = baseStr.indexOf('### Bug Fixes');
	if(beginIndex > -1){
		// 存在fixes才执行后续处理
		beginIndex  += 13;
		var endIndex = baseStr.indexOf('### Features');
		if(endIndex == -1){
			endIndex = baseStr.length;
		}
		var headStr = baseStr.substring(0,beginIndex);
		var endStr = baseStr.substring(endIndex);
		var sortStr = baseStr.substring(beginIndex,endIndex);
		var sortArr = sortStr.split('* ');
		var proArr = [];
		var otherArr = [];
		for(var i in sortArr){
			var nowStr = sortArr[i];
			if(i > 0){
				if(nowStr.indexOf('pro-') == 0){
					proArr.push(nowStr);
				}else{
					otherArr.push(nowStr);
				}
			}
		}
		var proStr = '';
		for(var i in proArr){
			proStr += '* ' + proArr[i] + '\r\n';
		}

		var otherStr = '';
		for(var i in otherArr){
			otherStr += '* ' + otherArr[i] + '\r\n';
		}

		var newStr = headStr + '\r\n' +  proStr + otherStr + endStr;
		return newStr;
	}else{
		return baseStr;
	}
}


function getResolvePath(p){
	return path.resolve(__dirname, p)
}