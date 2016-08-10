'use strict';

/*
 * 遍历所有的js，提取export之后生成对应的index代码
*/
var fs = require('fs');
var path = './';
var importStr = '';
var thisStr = '';

fs.readdir(path, function (err, files) {
	if (err) {
		console.log('read dir err:' + err);
	} else {
		files.forEach(function (item) {
			var tmpPath = path + '/' + item;
			var fileArr = item.split('.');
			var fileName = fileArr[0];
			var fileType = fileArr[1];
			if (fileType == 'js' && fileName != 'nodeApp' && fileName != 'index') {
				fs.stat(tmpPath, function (err, stat) {
					// 只对当前目录进行处理
					if (stat.isFile()) {
						var data = fs.readFileSync(tmpPath);
						var dataStr = data.toString();
						var dataArr = dataStr.split('export');
						var exportStr = dataArr[1];
						if (exportStr) {
							importStr += "\r\nimport" + exportStr + " from './" + fileName + "'; \r\n";
							var this1 = exportStr.replace('{', '');
							var this2 = this1.replace('}', '');
							var thisArr = this2.split(',');
							thisStr += '\r\n//' + fileName + '\r\n';
							for (var i = 0; i < thisArr.length; i++) {
								var strs = thisArr[i].replace(/\r\n/g, '').replace(/\ /g, '').replace(/\	/g, '');
								thisStr += 'this.' + strs + '= ' + strs + ';\r\n';
							}
						}
					}
				});
			}
		});
	}
});

setTimeout(function () {
	fs.writeFile("zzimportStr.txt", importStr, function (err) {
		if (err) {
			console.log("importStr.txt: " + err);
		}
	});
	fs.writeFile("zzthisStr.txt", thisStr, function (err) {
		if (err) {
			console.log("thisStr.txt: " + err);
		}
	});
}, 1000);