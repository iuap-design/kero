var fs = require('fs');
var path = require('path');

var filePath = getResolvePath('CHANGELOG.md');

fs.exists(filePath,function(exist) {
	if(exist){
		var data = fs.readFile(filePath,function(err,d){
			if(err){
				console.log('read err:' + filePath);
			}else{
				var baseStr = d.toString();
				var beginIndex = baseStr.indexOf('### Bug Fixes') + 13;
				var endIndex = baseStr.indexOf('### Features');
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
				fs.writeFile(filePath, newStr, function(err){
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



function getResolvePath(p){
	return path.resolve(__dirname, p)
}