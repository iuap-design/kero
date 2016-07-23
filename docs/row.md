
# u.Row

## setValue

设置当前行的字段值

	datatable.setValue(fieldName, value)


**params:**

*fieldName* : 字段名

*value*:　值   

---
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