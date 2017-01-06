<img src="http://tinper.org/assets/images/kero.png" width="120" style="max-width:100%;"/>


[![npm version](https://img.shields.io/npm/v/kero.svg)](https://www.npmjs.com/package/kero)
[![Build Status](https://img.shields.io/travis/iuap-design/kero/master.svg)](https://travis-ci.org/iuap-design/kero)
[![devDependency Status](https://img.shields.io/david/dev/iuap-design/kero.svg)](https://david-dm.org/iuap-design/kero#info=devDependencies)
[![NPM downloads](http://img.shields.io/npm/dm/kero.svg?style=flat)](https://npmjs.org/package/kero)


[中文文档](./README_CN.md)
##  Introduction
[kero](http://tinper.org/dist/kero/index.html) 是一个前端模型框架，做为`MVVM` 架构中 `Model` 层的增强，提供多维数据模型，解决企业应用中复杂的业务应用场景的开发问题。


## Features


### 丰富的API

对外暴露丰富的增删改查API，方便开发者对页面数据的管理

### 多维数据模型

解决了字段关联、主子数据、主子孙等多维数据模型的绑定问题

### 状态标识

数据增加状态标识：新增、修改、删除，方便开发者使用

### 分页缓存能力

具有分页缓存能力，可在前台处理分页，实现跨页操作数据(非必要情况下，不推荐前台分页)  

### 事件触发器

具有事件触发器，增删改查过程中的数据变化通过on方法添加监听，供开发者使用

## 快速上手

### 获取kero

- 直接从github获取我们的源码
```
git clone git@github.com:iuap-design/kero.git
```

- 使用npm安装

```
npm install kero
```

### 简单示例

#### 模型定义

模型定义方法：

		var myDataTable = new u.DataTable({
			meta:{
				field1:{required:true},
				field2:{}
			}
		})


meta中是模型的字段信息，字段名对应的对象为字段的属性定义。没有字段属性时，可以为空对象。

字段的属性值在控件模型中被使用到，主要用于控制表单输入、字段显示格式等业务特性。



####  数据载入到模型中 

模型定义好之后，可以通过`dataTable.setSimpleData`方法把从后台查询到的json数据载入模型之中：

    dataTable.setSimpleData([
        {"id": "001","name": "tom"},
        {"id": "002","name": "john"}
    ])

数据载入到模型中之后，数据被存储在一组`Row`对象之中，json数组中的每一个对象，对应dataTable中的`Row`对象中。


#### 新增数据行并赋值

	var row = dataTable.createEmptyRow();
	row.setValue('id','003')

新增的数据在dataTable中表现为新增一个`Row`对象。调用`setValue`对其中字段赋值。

#### 修改已存在的行中数据

	var row = dataTable.getRow(index);
	row.setValue('name','jerry');


#### 删除某一行数据

	dataTable.removeRow(index);

#### 获取所有数据

	var json = dataTable.getSimpleData();

#### 添加事件监听

示例如下：

```
//数据改变监听
dataTable1.on('valueChange',function(event){
	var field = event.field,
		rowId = event.rowId,
		oldValue = event.oldValue,
		newValue = event.newValue;
});
```


## Document

[Develop documentation](http://tinper.org/dist/kero/docs/overview.html)

[Website](http://tinper.org)

## Contributing


### Feedback

If you encounter any problems , submit [issues](https://github.com/iuap-design/kero/issues),or pull request。

[PR code](CONTRIBUTING.md)

### Develop

Developers can participate in the development of neoui,  but also can be based on neoui two development


tinper-neoui use gulp.js and webpack build the project.


clone：

```
$ git clone git@github.com:iuap-design/kero.git
```

install：

```
$ npm install
```

build：

```
$ npm run product
```

### Website Chat Group

527124070

## Licence 版权

[MIT](./LICENSE)
