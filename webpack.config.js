/* global __dirname */

var path = require('path');
var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var fs = require('fs');

var dir_js = path.resolve(__dirname, 'src');
var dir_build = path.resolve(__dirname, 'dist');

var libraryName = 'kero';

var data = fs.readFileSync('./package.json', 'utf8');
var packageObj = JSON.parse(data);
var headerStr = '';
headerStr += packageObj.name + ' v' + packageObj.version + '\r\n';
headerStr += packageObj.description + '\r\n';
headerStr += 'author : ' + packageObj.author + '\r\n';
headerStr += 'homepage : ' + packageObj.homepage + '\r\n';
headerStr += 'bugs : ' + packageObj.bugs.url;
var plugins = [new webpack.BannerPlugin(headerStr),
    new webpack.LoaderOptionsPlugin({
        minimize: true
    }),
    new webpack.NoErrorsPlugin()
]

var returnFUn = function(env) {
    var mode = env.mode,
        outputFile;

    if (mode == 'build') {
        outputFile = libraryName + '.min.js';
        plugins.push(new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            beautify: true
        }))
        plugins.push(new UglifyJsPlugin({
      		minimize: true
      	}));
    } else {
        outputFile = libraryName + '.js';
        plugins.push(new webpack.optimize.UglifyJsPlugin({
            mangle: false,
            beautify: true
        }))
    }

    var obj = {
        entry: path.resolve(dir_js, 'index.js'),
        output: {
            path: dir_build,
            filename: outputFile
        },
        devServer: {
            contentBase: dir_build,
        },
        module: {
            loaders: [{
                loader: 'babel-loader',
                test: dir_js,
                query: {
                    //presets: ['es2015'],

                    // All of the plugins of babel-preset-es2015,
                    // minus babel-plugin-transform-es2015-modules-commonjs
                    plugins: [
                        'transform-es2015-template-literals',
                        'transform-es2015-literals',
                        'transform-es2015-function-name',
                        'transform-es2015-arrow-functions',
                        'transform-es2015-block-scoped-functions',
                        'transform-es2015-classes',
                        'transform-es2015-object-super',
                        'transform-es2015-shorthand-properties',
                        'transform-es2015-computed-properties',
                        'transform-es2015-for-of',
                        'transform-es2015-sticky-regex',
                        'transform-es2015-unicode-regex',
                        'check-es2015-constants',
                        'transform-es2015-spread',
                        'transform-es2015-parameters',
                        'transform-es2015-destructuring',
                        'transform-es2015-block-scoping',
                        'transform-es2015-typeof-symbol', ['transform-regenerator', {
                            async: false,
                            asyncGenerators: false
                        }],
                    ],
                },
            }]
        },
        plugins: plugins,
        stats: {
            // Nice colored output
            colors: true
        },
        // Create source maps for the bundle
        devtool: 'source-map',
    }
    return obj;
}
module.exports = returnFUn;
