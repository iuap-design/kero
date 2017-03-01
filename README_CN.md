<img src="http://tinper.org/assets/images/kero.png" width="120" style="max-width:100%;"/>


[![npm version](https://img.shields.io/npm/v/kero.svg)](https://www.npmjs.com/package/kero)
[![Build Status](https://img.shields.io/travis/iuap-design/kero/master.svg)](https://travis-ci.org/iuap-design/kero)
[![devDependency Status](https://img.shields.io/david/dev/iuap-design/kero.svg)](https://david-dm.org/iuap-design/kero#info=devDependencies)
[![NPM downloads](http://img.shields.io/npm/dm/kero.svg?style=flat)](https://npmjs.org/package/kero)


[English Document](./README.md)
##  介绍
[kero](http://tinper.org/dist/kero/index.html) 是一个前端模型框架，做为`MVVM` 架构中 `Model` 层的增强，提供多维数据模型，解决企业应用中复杂的业务应用场景的开发问题。


## 功能


-  **丰富的API: **对外暴露丰富的增删改查API，方便开发者对页面数据的管理

- **多维数据模型: **解决了字段关联、主子数据、主子孙等多维数据模型的绑定问题

-  **状态标识: ** 数据增加状态标识：新增、修改、删除，方便开发者使用

- **分页缓存能力: **具有分页缓存能力，可在前台处理分页，实现跨页操作数据(非必要情况下，不推荐前台分页)  

- **事件触发器:** 具有事件触发器，增删改查过程中的数据变化通过on方法添加监听，供开发者使用

## 快速上手

### 获取kero

- npm资源

```
npm install kero
```
- cdn 资源
```
//design.yyuap.com/static/kero/latest/js/kero.js
```

### 引入kero
- ES6语法
```
import { Datatable } from "kero/src/index"

```
- HTML直接引入
```
<!-- kero依赖 knockout需要提前引入-->
<script src="//design.yyuap.com/static/knockout/knockout-3.2.0.debug.js"></script>
<script src="//design.yyuap.com/static/kero/latest/js/kero.js"></script>
```

### 简单示例

#### 模型定义

模型定义方法：

		var myDataTable = new DataTable({
			meta:{
				id:{required:true},
				name:{}
			}
		})


meta中是模型的字段信息，字段名对应的对象为字段的属性定义。没有字段属性时，可以为空对象。

字段的属性值在控件模型中被使用到，主要用于控制表单输入、字段显示格式等业务特性。



####  数据载入到模型中 

模型定义好之后，可以通过`dataTable.setSimpleData`方法把从后台查询到的json数据载入模型之中：

    myDataTable.setSimpleData([
        {"id": "001","name": "tom"},
        {"id": "002","name": "john"}
    ])

数据载入到模型中之后，数据被存储在一组`Row`对象之中，json数组中的每一个对象，对应dataTable中的`Row`对象中。


#### 新增数据行并赋值

	var row = myDataTable.createEmptyRow();
	row.setValue('id','003')

新增的数据在dataTable中表现为新增一个`Row`对象。调用`setValue`对其中字段赋值。

#### 修改已存在的行中数据

	var row = myDataTable.getRow(index);//index为行的索引，index为0说明获取的是第一行数据
	row.setValue('name','jerry');//修改后第一行的对象的name为jerry


#### 删除某一行数据

	myDataTable.removeRow(index);//index为行的索引

#### 获取所有数据

	var json = myDataTable.getSimpleData();

#### 添加事件监听

示例如下：

```
//数据改变监听
myDataTable.on('valueChange',function(event){
	var field = event.field,
		rowId = event.rowId,
		oldValue = event.oldValue,
		newValue = event.newValue;
});
```
开发文档详见[这里](http://tinper.org/dist/kero/docs/overview.html)。


## 如何参与贡献

### 开发及构建

开发者可以一起参与为 kero 贡献代码，同时也可以基于 kero 进行二次开发或封装插件。

克隆项目文件:

```
$ git clone git@github.com:iuap-design/kero.git
```

然后进入目录安装依赖：

```
$ npm install
```

接下来，执行 `gulp`：

```
$ npm run product
```


### 反馈
如在使用过程中遇到任何问题，可以在[这里](https://github.com/iuap-design/kero/issues)提交issue反馈；

或者直接fork代码到你的github仓库，提交pull request给我们。


[Bug 反馈及需求提交](CONTRIBUTING.md)

## Licence 版权

[MIT](./LICENSE)
