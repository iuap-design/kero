# 数据模型

数据模型(dataTabe)作为MVVM架构中Model层的增强。主要功能有：

+ 以行、列的形式，通过json对象对数据做存储，并对外暴露一批增删改查的API，方便开发者对页面数据的处理，而且所有开发者之间做到统一，减少出错概率。
+ 数据增加状态标识新增或修改，方便开发者使用。
+ 具有分页缓存能力，可在前端处理分页(非必要情况下，不推荐前端分页)。
+ 提供事件监听u.on(element, eventName,child,listener)，把数据变化触发出去，供开发者监听使用。


## 模型定义

模型定义方法：

		var myDataTable = new u.DataTable({
			meta:{
				field1:{required:true},
				field2:{}
			}
		})


meta中是模型的字段信息，字段名对应的对象为字段的属性定义。没有字段属性时，可以为空对象。

字段的属性值在控件模型中被使用到，主要用于控制表单输入、字段显示格式等业务特性。



## 数据载入到模型中 

模型定义好之后，可以通过`dataTable.setSimpleData`方法把从后台查询到的json数据载入模型之中：

    dataTable.setSimpleData([
        {"id": "001","name": "tom"},
        {"id": "002","name": "john"}
    ])

数据载入到模型中之后，数据被存储在一组`Row`对象之中，json数组中的每一个对象，对应dataTable中的`Row`对象中。


## 数据的新增与修改

### 新增数据行并赋值

	var row = dataTable.createEmptyRow();
	row.setValue('id','003')

新增的数据在dataTable中表现为新增一个`Row`对象。调用`setValue`对其中字段赋值。

### 修改已存在的行中数据

	var row = dataTable.getRow(index);
	row.setValue('name','jerry');


## 数据的删除

### 删除某一行数据

	dataTable.removeRow(index);

### 删除所有行数据

	dataTable.removeAllRows();


## 获取模型中的数据

### 获取所有数据

	var json = dataTable.getSimpleData();

获取到的json数据格式，与载入时的数据格式一致。一般是在提交数据时，调用此方法，获取数据后提交给后端。
在调用`getSimpleData`方法时可传递参数`type`来决定获取的数据类型。

	var json = dataTable.getSimpleData({type:'select'});

type可设置为：

+ select: 处理选中状态的行数据
+ focus: 焦点状态的行数据
+ change: 发生改变的行数据

默认不传递参数则获取所有的数据。 

### 获取某一行的数据

	var row = dataTable.getRow(index);
	var json = row.getSimpleData();

### 获取某一行中某个字段的值

	var row = dataTable.getRow(index);
	var value = row.getValue('name');


















