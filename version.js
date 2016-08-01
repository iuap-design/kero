var fs = require('fs');
var path = require('path');

module.exports = {

	/**
	 * 文件处理入口
	 * @return {[type]} [description]
	 */

	init: function(filesArr) {
		// 读取package.json，将里面内容生成头信息
		var data = fs.readFileSync('./package.json', 'utf8');
		var packageObj = JSON.parse( data );

		var headerStr = '/** \r\n';
			headerStr += ' * ' + packageObj.name + ' v' + packageObj.version + '\r\n';
			headerStr += ' * ' + packageObj.description + '\r\n';
			headerStr += ' * author : ' + packageObj.author + '\r\n';
			headerStr += ' * homepage : ' + packageObj.homepage + '\r\n';
			headerStr += ' * bugs : ' + packageObj.bugs.url + '\r\n';
			headerStr += ' **/ \r\n';


		for (var i = 0; i < filesArr.length; i++){
			var filePath = filesArr[i]
			var data = fs.readFileSync(filePath, 'utf8');
			data = headerStr  + data;
			fs.writeFileSync(filePath, data);
		}
	},
	
};