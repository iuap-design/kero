var fs = require('fs');
var fse = require('fs-extra');
var path = require('path');
var yaml = require('js-yaml');
var async = require('async');
var ut = require('./utool.js')
   
var envPath = process.cwd();
var ymlPath = path.join(envPath, '_config.yml');
var ymlConfig = yaml.safeLoad(fs.readFileSync(ymlPath, 'utf8'));
var snipConfig = ymlConfig.snip_dir;
var sumFile = ymlConfig.snip_sum;

var srcFile = ymlConfig.source;
var readFile = ymlConfig.snip_index;
var snipPath = path.join(envPath, snipConfig);
var examplesPath = path.join(envPath, ymlConfig.example);

// 遍历根目录snipPath
async.auto({

    docPath: function(cb) {

        var dir = snipPath,
            DIR = dir;
        async.auto({
            //获取组件列表
            kits: function(cb) {
                fs.readdir(dir, function(err, kits) {
                    kits = ut.rmdot(kits);

                    // copymdAry - 目录下直接拷贝，无需合并的部分，包含summary.md,readme.md,及没有实力的纯文档组件
                    var copymdAry = kits.filter(function(kit) {
                            return /\.md$/.test(kit)
                        })
                        // console.log(copymdAry)
                        // 排除Summary && README及单一文档组件外的组件名集合
                    var newkits = kits.filter(function(kit) {
                        return !(/\.md$/.test(kit))
                    })


                    /**
                     * 判断`.md`是否与文件件重名,报错
                     */
                    var repeater = copymdAry.filter(function(ele) {
                        var basename = ele.replace(/\.md$/, '');
                        return (newkits.indexOf(basename) === -1) ? null : basename;
                    })

                    function RepeatError(ary) {
                        var repeatMenu = path.basename(dir);
                        console.log('%s目录下\n%s\n文件重复,请手动处理\n', repeatMenu, ary)
                    }
                    if (repeater.length != 0) {
                        throw new RepeatError(repeater);
                    }

                    /**
                     * copy 根目录下md文档（包括SUMMARY & README）
                     * 使用到全局变量: sumFile,readFile,snipConfig,srcFile
                     */
                    var markCopy = function(dir, kits, file) {
                        var fillindex = kits.indexOf(file);
                        if (fillindex != -1) {
                            var copySnippet = path.join(dir, file);
                            var copySrc = copySnippet.replace(snipConfig, srcFile);
                            var data = fs.readFileSync(copySnippet, 'utf-8');
                            fse.ensureFileSync(copySrc);
                            fs.writeFileSync(copySrc, data, 'utf-8');
                            // console.log("copySnippet:",copySnippet,"...copySrc",copySrc)
                        }
                    }
                    copymdAry.forEach(function(file) {
                        markCopy(DIR, kits, file);
                    })

                    cb(null, newkits);
                    // kits value = [ breadcrumb','buttongroup','dropdown','tree' ...]

                })
            },
            // 读取单一组件内容
            readkit: ['kits', function(ele, cb) {
                // ele为上一级返回的对象,key值为上一fun函数的函数名
                // {kits:[ breadcrumb','buttongroup','dropdown','tree' ...]}
                // 需要执行ele.kits
                var kits = cb.kits;
                var snipBase = ymlConfig.snip_base
                var snipDemo = ymlConfig.snip_demo
                    // kit: 组件文件夹,如 button | navbar | ...
                kits.forEach(function(kit, index) {
                    // 最后的回调使用到了此kit变量
                    var KIT = kit;

                    var kitpath = path.resolve(dir, kit)
                    var kitfiles = fs.readdirSync(kitpath);
                    var kitfiles = ut.rmdot(kitfiles);

                    // 最后修改
                    async.mapSeries(kitfiles, function(kfile, wholeback) {
                        var kpath;
                        var baseMd = null;

                        if (kfile === snipBase) {
                            // kpath: base.md路径,读取基本内容
                            kpath = path.join(kitpath, kfile)
                            var bdata = fs.readFileSync(kpath, 'utf-8');
                            baseMd = bdata;
                            wholeback(null, baseMd);
                            //   fs.readFile(kpath,'utf-8',function(err,data){
                            //       baseMd = data;
                            //       wholeback(null, baseMd);
                            //   })
                        } else if (kfile === snipDemo) {
                            // kpath: 单一demo路径.
                            // 进行读取排序，合并
                            kpath = path.join(kitpath, kfile)
                                // kpath: /Users/AYA/Desktop/work/tinper.org/snippets/neoui/component/gallery/demo
                            var demofile = fs.readdirSync(kpath, 'utf-8');

                            demofiles = ut.rmdot(demofile).sort();
                            //   console.log(kpath,'----',demofiles)
                            //   fs.readdir(kpath, function(err, files){
                            //   var files = ut.rmdot(files).sort();
                            // mapSeries顺序执行以上 sort结果
                            async.mapSeries(demofiles, function(exfile, callback) {
                                var outexPath = path.join(examplesPath, kit + exfile + '.html');
                                var exPath = path.join(kpath, exfile);
                                //   console.log(exPath);
                                // /Users/AYA/Desktop/work/tinper.org/snippets/neoui/global/utilities/demo/4-other-display
                                //start 示例文件夹遍历
                                var exfiles = fs.readdirSync(exPath, 'utf-8');
                                var files = ut.rmdot(exfiles).sort();
                                //   fs.readdir(exPath, function(err,files){
                                // files为最终层级文件，如.html .md .css .js
                                //   var files = ut.rmdot(files);
                                var baseDemo = [];
                                var demoMd = [];
                                var demoHtml = [];
                                var demoCss = [];
                                var demoJs = [];
                                var codeHtml = [];
                                var codeCss = [];
                                var codeJs = [];
                                var ctxPath = '//design.yyuap.com/static/uui/latest';
                                var optBtn = '<button  class="u-button u-button-block u-button-accent margin-top-15 codeOptBtn" ><i class="uf uf-arrow-down"></i>查看代码</button>';

                                var styles, htmls, scripts, tpl;
                                // react js代码
                                var beeScript = beeShow = [];

                                var codeFun = function(data) {
                                        return '<div class="examples-code"><pre><code>\r\n' + data + '</code></pre>\r\n</div>\r\n';
                                    }
                                    // 处理js注释不显示星号问题
                                var jsCodeFun = function(data) {
                                        return '<pre class="examples-code"><code>\r\n' + data + '</code></pre>\r\n';
                                    }
                                    // 转义pre > code 下的html标签
                                var codeHtmlFun = function(data) {
                                    return '<div class="examples-code"><pre><code>\r\n' + data.replace(/\</g, '&lt;') + '</code></pre>\r\n</div>\r\n';
                                }

                                //遍历demo文件夹start
                                //   console.log('exPath',exPath);
                                async.mapSeries(files, function(item, cb) {
                                        var filePath = path.join(exPath, item);
                                        // console.log('filePath',filePath,"---files:",files);
                                        // console.log("files:",files,'\npath',exPath);
                                        var ts = fs.readFileSync(filePath, 'utf-8')
                                        if (/\.md$/.test(filePath)) {

                                            demoMd = ts;
                                            cb(null, null)
                                        } else if (/\.html$/.test(filePath)) {

                                            htmls = ts;
                                            demoHtml = '<div class="example-content">' + ts + '</div>\r\n';
                                            codeHtml = codeHtmlFun(ts);
                                            cb(null, null)
                                        } else if (/\.css$/.test(filePath)) {

                                            styles = ts;
                                            demoCss = '<div class="example-content ex-hide"><style>\r\n' + ts + '\r\n</style></div>';
                                            codeCss = codeFun(ts);
                                            cb(null, null)
                                        } else if (/\.js$/.test(filePath)) {

                                            scripts = ts;
                                            demoJs = '\r\n<script>\r\n' + ts + '\r\n</script>\r\n';
                                            codeJs = jsCodeFun(ts);
                                            cb(null, null)
                                        }

                                    }, function(err, results) {
                                        // console.log("exPath:",exPath,"\nfiles:",files,'\nbeeShow:'+ beeShow.length);
                                        baseDemo = '\r\n' + demoMd + '\r\n' +
                                            demoHtml + '\r\n' + demoCss + '\r\n' + demoJs + '\r\n' + beeScript + '<div class="ex-code-par">' + optBtn +
                                            codeHtml + '\r\n' + codeCss + '\r\n' + codeJs + '\r\n' + beeShow + '</div>';
                                        demoMd = [];
                                        demoHtml = [];
                                        demoCss = [];
                                        demoJs = [];
                                        codeHtml = [];
                                        codeCss = [];
                                        codeJs = [];

                                        //写入examples文件夹中
                                        tpl = [
                                            '<!DOCTYPE html>\r\n',
                                            '<html lang="en">\r\n',
                                            '<head>\r\n',
                                            '<meta charset="UTF-8">\r\n',
                                            '<meta name="viewport" content="width=device-width, initial-scale=1">\r\n',
                                            '<title>Title</title>\r\n',
                                            '<link rel="stylesheet" href="//design.yyuap.com/static/uploader/css/webuploader.css">\r\n',
                                            '<link rel="stylesheet" href="' + ctxPath + '/css/font-awesome.css">\r\n',
                                            '<link rel="stylesheet" type="text/css" href="' + ctxPath + '/css/u.css">\r\n',
                                            '<link rel="stylesheet" type="text/css" href="' + ctxPath + '/css/tree.css">\r\n',
                                            '<link rel="stylesheet" type="text/css" href="' + ctxPath + '/css/grid.css">\r\n',
                                            '<style id="demo-style" media="screen">\r\n',
                                            styles,
                                            '</style>\r\n',
                                            '</head>\r\n',
                                            '<body style="background-color: #eceff1;margin-left: 20px;width: calc(100% - 20px );">\r\n',
                                            htmls,
                                            '<script src="//design.yyuap.com/static/jquery/jquery-1.11.2.js"></script>\r\n',
                                            '<script src="//design.yyuap.com/static/uploader/js/webuploader.js"></script>\r\n',
                                            '<script src="//design.yyuap.com/static/knockout/knockout-3.2.0.debug.js"></script>\r\n',
                                            '<script src="' + ctxPath + '/js/u-polyfill.js"></script>\r\n',
                                            '<script src="' + ctxPath + '/js/u.js"></script>\r\n',
                                            '<script src="' + ctxPath + '/js/u-tree.js"></script>\r\n',
                                            '<script src="' + ctxPath + '/js/u-grid.js"></script>\r\n',
                                            '<script src="//design.yyuap.com/static/requirejs/require.debug.js"></script>\r\n',
                                            '<script>\r\n',
                                            scripts,
                                            '</script>\r\n',
                                            '</body>\r\n',
                                            '</html>\r\n'
                                        ];
                                        fs.writeFileSync(outexPath, tpl.join(""));
                                        callback(null, baseDemo);
                                    })
                                    //遍历demo文件夹end

                                //   })
                                //end 示例文件夹遍历

                            }, function(err, results) {
                                // 返回的数据以数组形式返回需要合并
                                var data = results.join('\r\n');
                                wholeback(null, data);
                            });

                            //   })

                        }
                    }, function(err, results) {
                        // 返回的数据以数组形式返回需要合并
                        var data = results.join('\r\n');

                        // 调用 `DIR` & `KIT`
                        var srcMdir = DIR.replace(snipConfig, srcFile)
                            // console.log("srcMdir:",srcMdir,"\nkit:",kit);
                        var outdir = path.join(srcMdir, `${KIT}.md`);
                        var results = results.join('\r\n');

                        fse.ensureFile(outdir, function() {
                            fs.writeFile(outdir, results, 'utf-8')
                        });

                    })
                })

            }]

        })

    }

})
