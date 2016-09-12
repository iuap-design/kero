
# u.Row

## setValue

设置当前行的字段值

	datatable.setValue(fieldName, value)


**params:**

*fieldName* : 字段名

*value*:　   



---


## setData

设置当前行数据

data：row对象


## getValue  

获取当前行字段的值

	datatable.getValue(fieldName)

**params:**

*fieldName*: 字段名

----------

## setSimpleData

设置Row中的数据

	
	Row.setSimpleData({"field1":"v1","field2":"v2"})
 
---

## getSimpleData

获取Row中的数据

	
	Row.getSimpleData()
 
---
## ref

以knockout语法做双向绑定，显示此行的字段值

	<label data-bind="text: Row.ref('fieldName')"></label>

*params:*

`fieldName` : 字段名


## getMeta

获取row中某一列的属性

	getMeta(fieldName, key)

fieldName: 字段名称
key： 某个字段对应的列名称


## setMeta

设置row中某一列的属性

	setMeta(fieldName, key, value)

fieldName： 字段名称
key：属性名称
value： 属性对应的具体值



## refEnum

以knockout语法做双向绑定，显示此行的字段值为是、否、“”。

	<label data-bind="text: Row.refEnum('fieldName')"></label>

fieldName：想要显示值多对应的字段名称

如果字段值为N，则显示“否”。如果字段值为Y，则显示“是”

## refDate
以knockout语法做双向绑定,使用时间格式化显示字段值

	<label data-bind="text: Row.refDate('fieldName',format)"></label>


fieldName: 字段值

format: 时间格式化的格式（可选）默认值：




	
