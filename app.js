var fs = require('fs');
var file = require('file')
var basePath = 'snippets/examples'; 
var docPath = 'snippets/docs';
/* 初始化处理 begin */
function deleteFolderRecursive(path) {
    var files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

function deleteChildFolderRecursive(path){
	if(fs.existsSync(path)){
		files = fs.readdirSync(path);
        files.forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
	}
}

deleteChildFolderRecursive('examples');
deleteChildFolderRecursive('docs');
deleteChildFolderRecursive('snippets/temp/datatable');
deleteChildFolderRecursive('snippets/temp/ui');

fs.exists('snippets/temp',function(exist) {
	if(!exist){
		fs.mkdirSync('snippets/temp');
	}
})
fs.exists('snippets/temp/datatable',function(exist) {
	if(!exist){
		fs.mkdirSync('snippets/temp/datatable');
	}
})
fs.exists('snippets/temp/ui',function(exist) {
	if(!exist){
		fs.mkdirSync('snippets/temp/ui');
	}
})

/* 初始化处理 end */

/* 处理examples文件夹 begin*/
function copyExamp(path,pathLength){
	fs.readdir(path,function(err, files){
		if(err){
			console.log('examples read dir err:' + path);
		}else{
			// 遍历目录下所有子项
			files.forEach(function(item){
				var tmpPath = path + '/' + item;
				fs.stat(tmpPath,function(err, stat){
					if(stat.isFile()){
						// 判断文件类型,如果是.html则转化
						var htmlIndex = item.indexOf('.html');
						var jsIndex = item.indexOf('.js');
						var cssIndex = item.indexOf('.css');
						if(htmlIndex < 0 && (jsIndex > -1 || cssIndex > -1)){
							// 创建读取流
		                    readable = fs.createReadStream( tmpPath );
		                    // 创建写入流
		                    writable = fs.createWriteStream( 'examples/' + tmpPath.substring(pathLength) );   
		                    // 通过管道来传输流
		                    readable.pipe(writable);
						}
						if(htmlIndex > -1){
							fs.readFile(tmpPath,function(err,data){
								var htmlStr = '';
								if(err){
									console.log('read html err:' + tmpPath)
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
					        	fs.writeFile('examples/' + tmpPath.substring(pathLength),tplStr,function(err){
						        	if(err){
						        		console.log('write err:' + 'examples/' + item + '.html');
						        	}
						        })
					        })
						}
					}
					// 子项为目录创建目录
					if(stat.isDirectory()){
						var dirPath = 'examples/' + tmpPath.substring(pathLength);
						fs.exists(dirPath, function(exist) {
							if(!exist){
								fs.mkdirSync(dirPath);
							}
						});
						copyExamp(tmpPath,pathLength);
					}
				})
			})
		}
	})
}
copyExamp(basePath + '/grid',22);
/* 处理examples文件夹 end*/


/* 处理docs文件夹 begin*/
function copyDocs(path){
	// path:snippets/docs
	fs.readdir(path,function(err, files){
		if(err){
			console.log('docs read dir err:' + path);
		}else{
			// 遍历目录下所有子项
			files.forEach(function(item){
				var filePath = path + '/' + item; //snippets/docs/grid.md
				fs.stat(filePath,function(err, stat){
					if(stat.isFile()){
						// 判断文件类型,只针对.md文件进行处理，如果遍历到md文件，则snippets\examples下对应目录存放示例
						var index = item.indexOf('.md');
						var itemName = item.substring(0,index);
						if(index > -1){
							fs.readFile(filePath,function(err,data){
								eval(itemName + '=\'\'');
								if(err){
									console.log('read md err:' + htmlPath)
								}else{
									eval(itemName + '= data.toString();');
								}
								// 读取示例中的内容替换$ui$以及$datatable$ begin
								replaceMdFun(filePath,'datatable',itemName);
								replaceMdFun(filePath,'ui',itemName);
					        })
						}
						
					}
					// 子项为目录创建目录
					if(stat.isDirectory()){
						var dirPath = filePath.replace('docs','temp/datatable').replace('.md',''); //snippets/temp/datatable/grid
						fs.exists(dirPath, function(exist) {
							if(!exist){
								fs.mkdirSync(dirPath);
							}
						});
						var dirPath = filePath.replace('docs','temp/ui').replace('.md','');//snippets/temp/ui/grid
						fs.exists(dirPath, function(exist) {
							if(!exist){
								fs.mkdirSync(dirPath);
							}
						});
						copyDocs(filePath);
					}
				})
			})
		}
	})
}
copyDocs(docPath)


function replaceMdFun(filePath,type,itemName){
	//filePath:snippets/docs/grid.md
	var exampPath = filePath.replace('docs','examples').replace('.md','');// snippets/examples/grid
	var exampPathArr  = exampPath.split('/');			
	var mdName = exampPathArr[exampPathArr.length - 1]; //获取md文件的名称
	var replaceStr = '';
	// 遍历所有的文件夹，每个文件夹生成一个文件，然后最后将文件拼到md文件中，已经测试多目录的话是按目录结构生成的
	var exampTypePath = exampPath + '/' + type; //snippets/examples/grid/datatable
	file.walkSync(exampTypePath,function(bPath,d,files,r){
		// 每个子目录都会执行此function
		var path = bPath.replace(/\\/g,'/'); //snippets/examples/grid/datatable/base
		var pathArr = path.split('/');
		var dir = pathArr[pathArr.length - 1];
		var Str = '### ' + dir + '\r\n';
		var l = files.length,now = 0;

		if(files && l > 0){
			files.forEach(function(item){
				var tmpPath = bPath + '\\' + item; 
				tmpPath = tmpPath.replace(/\\/g,'/'); //snippets/examples/grid/datatable/base/widget.css
				fs.stat(tmpPath,function(err, stat){
					var cssIndex = item.indexOf('.css');
					var htmlIndex = item.indexOf('.html');
					var jsIndex = item.indexOf('.js');
					var txtIndex = item.indexOf('.txt');
					if(cssIndex > -1 || htmlIndex > -1 ||jsIndex > -1){
						fs.readFile(tmpPath,function(err,data){
							if(data.toString().length > 0)
								Str += '<pre><code>' + data.toString().replace(/\</g,'&lt;') + '</code></pre>\r\n';
				        })
					}
					if(txtIndex > -1){
						fs.readFile(tmpPath,function(err,data){
							Str += data.toString() + '\r\n';
							now++;
				        })
					}
				})
			})
			var ii = setInterval(function(){
				if(1 == now){
					var nowFilePath = filePath.replace('docs','temp/' + type).replace('.md','');//snippets/temp/datatable/grid
					fs.exists(nowFilePath, function(exist) {
						if(!exist){
							try{
								fs.mkdirSync(nowFilePath);
							}catch(e){
							}
						}
						nowFilePath = nowFilePath + '/' + dir + '.txt';//snippets/temp/datatable/grid/base.txt
						fs.writeFile(nowFilePath,Str,function(err){
				        	if(err){
				        		console.log('write err:' + nowFilePath);
				        	}
				        })
					});
			        clearInterval(ii);
				}
			})
		}
	})
	// 延迟执行保证testa目录下的文件已经生成
	setTimeout(function(){
		var tempPath = filePath.replace('docs','temp/' + type).replace('.md','');
		fs.exists(tempPath, function(exist) {
			if(!exist){
				fs.mkdirSync(tempPath);
			}
		});
		fs.readdir(tempPath,function(err,files){
			if(err){ //没有子目录会进入此分支
				// console.log('setTimeout err' + tempPath);
				var l = now = 1;
			}else{
				var l = files.length,now = 0 ;
				files.forEach(function(item){
					var p = tempPath + '/' + item;
					fs.readFile(p,function(err,data){
						replaceStr += data.toString();
						now++;
					})
				})
				
			}
			var iii = setInterval(function(){
				if(l == now){
					eval(itemName + '=' + itemName +'.replace("replace' + type + '",replaceStr)');
					// item = item.replace('replace' + type,replaceStr);
					if(type == 'ui'){
						fs.writeFile(filePath.replace('snippets/',''),eval(itemName),function(err){
				        	if(err){
				        		console.log('write err:' + filePath.replace('snippets/',''));
				        	}
				        })
					}
					clearInterval(iii);
				}
			},100);
		})
	},5000);
}
/* 处理docs文件夹 end*/