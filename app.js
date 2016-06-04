var fs = require('fs');
var basePath = 'examplesSrc'; 

function copyExamp(path){
	fs.readdir(path,function(err, files){
		if(err){
			console.log('read dir err' + path);
		}else{
			// 遍历目录下所有子项
			files.forEach(function(item){
				var tmpPath = path + '/' + item;
				fs.stat(tmpPath,function(err, stat){
					if(stat.isFile()){
						// 判断文件类型,如果是.html则转化
						var index = item.indexOf('.html');
						if(index < 0){
							// 创建读取流
		                    readable = fs.createReadStream( tmpPath );
		                    // 创建写入流
		                    writable = fs.createWriteStream( 'examples/' + tmpPath.substring(12) );   
		                    // 通过管道来传输流
		                    readable.pipe( writable );
						}
						if(index > -1){
							fs.readFile(tmpPath,function(err,data){
								if(err){
									console.log('read html err:' + htmlPath)
								}else{
									htmlStr = data.toString();
								}
								var ctx = 'http://iuap.yonyou.com/fe'
								var tpl = [
							        '<!DOCTYPE html>',
							        '<html lang="en">',
							        '<head>',
							        '<meta charset="UTF-8">',
							        '<meta name="viewport" content="width=device-width, initial-scale=1">',
							       	'<title>Title</title>',
									'<link rel="stylesheet" href="'+ ctx +'/vendor/font-awesome/css/font-awesome.css">',
							       	'<link rel="stylesheet" type="text/css" href="'+ ctx +'/vendor/uui/css/u.css">',
							       	'<link rel="stylesheet" type="text/css" href="'+ ctx +'/vendor/uui/css/u-extend.css">',
								    '<link rel="stylesheet" type="text/css" href="'+ ctx +'/vendor/uui/css/tree.css">',
							        '<link rel="stylesheet" type="text/css" href="'+ ctx +'/vendor/uui/css/grid.css">',
							        '<link rel="stylesheet" type="text/css" href="widget.css">',
							        '</head>',
							        '<body>',
							        htmlStr,
							        '<script src="'+ ctx +'/vendor/jquery/jquery-1.11.2.js"></script>',
							    	'<script src="'+ ctx +'/vendor/knockout/knockout-3.2.0.debug.js"></script>',
							        '<script src="'+ ctx +'/vendor/uui/js/u-polyfill.js"></script>',
							        '<script src="'+ ctx +'/vendor/uui/js/u.js"></script>',
							        '<script src="'+ ctx +'/vendor/uui/js/u-tree.js"></script>',
							        '<script src="'+ ctx +'/vendor/uui/js/u-grid.js"></script>',
									'<script src="'+ ctx +'/vendor/requirejs/require.debug.js"></script>',
									'<script src="widget.js"></script>',
							        '</body>',
							        '</html>'
						        ]
					        	var tplStr = tpl.join('\r\n');
					        	fs.writeFile('examples/' + tmpPath.substring(12),tplStr,function(err){
						        	if(err){
						        		console.log('write err:' + 'examples/' + item + '.html');
						        	}
						        })
					        })
						}
					}
					// 子项为目录创建目录
					if(stat.isDirectory()){
						var dirPath = 'examples/' + tmpPath.substring(12);
						fs.exists(dirPath, function(exist) {
							if(!exist){
								fs.mkdirSync(dirPath);
							}
						});
						copyExamp(tmpPath);
					}
				})
			})
		}
	})
}
copyExamp(basePath);
