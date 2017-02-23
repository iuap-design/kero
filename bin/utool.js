var fs = require('fs');
var path = require('path');



/**
 * ignore '.'开头隐藏文件
 */
var regDotFile = function(ele){
  return /^[^\.]/g.test(ele);
}
exports.rmdot = function(ary){
  return ary.filter(regDotFile);
}
// example
// var ary = [ '.DS_Store', 'neoui' ];
// newAry = rm_hideFile(ary);
// console.log(newAry);


/**
 *
 */
