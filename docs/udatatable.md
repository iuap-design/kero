
# u.DataTable

创建dataTable

	new u.DataTable({
		meta:{
			field1:{type:'string'},
			field2:{type:'date'}
		}
	})

*params*:

`meta`: 字段信息集合，其中的key为字段名，value为字段属性信息，属性信息可自定义

---
* **getSimpleData**

获取dataTable中的数据

	//默认获取所有数据
	dataTable.getSimpleData()
	
	//获取选中行的字段： field1,field2数据
	dataTable.getSimpleData({type:'select',fields:['field1,field2']})

*return*：

`datas`：  数据数组	

*params*:

`type`：获取指定类型的数据

| 类型      | 作用        |
| ------- | --------- |
| all     | 所有行的数据    |
| current | 当前行的数据    |
| focus   | 焦点行的数据    |
| select  | 被选中的行的数据  |
| change  | 发生改变的行的数据 |

`fields`：获取指定字段的数据

---
* **setSimpleData**

设置dataTable中的数据，将原有数据清除


	dataTable.setSimpleData([
		{"field1":"v1","field2":"v2"},
		{"field1":"v3","field2":"v4"}
	])

---
* **addSimpleData**

在dataTable中添加数据，原有数据不变


	dataTable.addSimpleData([
		{"field1":"v1","field2":"v2"},
		{"field1":"v3","field2":"v4"}
	])

---
* **clear**

清除dataTable中的所有数据


	dataTable.clear()
---
* **createEmptyRow**

创建新行，并追加到dataTable行数据集合的最后

	dataTable.createEmptyRow()

*return*：

`row`：  行对象	

---
* **removeRow**

删除行

	dataTable.removeRow(index)

*params*:

`index` :要删除的行索引

---
* **removeRowByRowId**

根据行的id来删除行

	dataTable.removeRowByRowId(rowId)
*params*:

`rowId` :要删除的行id	

---
* **removeRows**

删除一组行数据

	dataTable.removeRows(indices)

*params*:

`indices` : 要删除的行索引数组

---
* **removeAllRows**

删除所有行

	dataTable.removeAllRows()


---

* **setRowSelect**

设置行选中

	dataTable.setRowSelect(index)

*params*:

`index` :要选中的行索引

---

* **setRowsSelect**

设置多行选中

	dataTable.setRowsSelect(indices)

*params*:

`indices` : 要选中的行索引数组

---

* **addRowSelect**

追加行选中

	dataTable.addRowSelect(index)

*params*:

`index` :要选中的行索引

---

* **addRowsSelect**

追加行选中
​	
	dataTable.addRowsSelect(indices)

*params*:

`indices` : 要追加的行索引数组

---
* **setAllRowsSelect**

设置所有行为选中状态

	dataTable.setAllRowsSelect()
---
* **setRowUnSelect**

设置行为非选中状态

	dataTable.setRowUnSelect(index)

*params*:

`index` :行索引

---

* **setRowsUnSelect**

设置多行为非选中状态

	dataTable.setRowsUnSelect(indices)

*params*:

`indices` :行索引数组

---

* **setAllRowsUnSelect**

设置所有行为非选中状态

	dataTable.setAllRowsUnSelect()
---

* **getSelectedRows**

获取选中行

	dataTable.getSelectedRows()
---
* **getSelectedIndexs**

获取选中行的index

	dataTable.getSelectedIndexs()
---
* **setRowFocus**

设置焦点行

	dataTable.setRowFocus(index)

*params*:

`index` :要设置焦点行的索引

---

* **setRowUnFocus**

设置焦点行为非焦点状态

	dataTable.setRowUnFocus()


---

* **getFocusRow**

获取焦点行

	dataTable.getFocusRow()
---
* **getFocusIndex**

获取焦点行对应的index

	dataTable.getFocusIndex()
---
* **getCurrentRow**

获取当前行。规则： 焦点行优先，没有焦点行时，取第一选中行

	dataTable.getCurrentRow()
---
* **getRow**

根据索引获取Row对象

	dataTable.getRow(index)
*params*:

`index` :要获取行的索引

---
* **getRowByRowId**

根据rowId获取Row对象

	dataTable.getRow(rowid)
*params*:

`rowid` :要获取行的rowid

---
* **getChangedRows**

根据所有发生变化的Row对象

	dataTable.getChangedRows()
---
* **getAllRows**

根据所有的Row对象

	dataTable.getAllRows()
---
* **setEnable**

设置dataTable是否可编辑

	dataTable.setEnable()
---
* **isEnable**

获取dataTable是否可编辑。如果传入field则获取对应field是否可编辑

	dataTable.isEnable() 或 dataTable.isEnable('filed1')

> dataTable.isEnable()
> *params*:

`field` :判断field是否可编辑

---
* **setValue**

设置当前行的字段值

	datatable.setValue(fieldName, value)


*params:*

`fieldName` : 字段名

`value`:　值   

---

* **getValue**  

获取当前行字段的值

	datatable.getValue(fieldName)

*params:*

`fieldName`: 字段名

*return*:

`value`: 字段值	

---

* **on**

绑定事件监听

	datatable.on(eventName, callBack)

*params:*

`eventName`: 事件名称

`callBack`: 回调函数

支持的事件类型：

| 事件名称            | 事件说明            | 回调函数接受的参数                                |
| --------------- | --------------- | ---------------------------------------- |
| valueChange     | 字段值发生变化事件       | dataTable：此dataTable对应id；rowId：发生改变行的rowId；field：发生改变的field；oldValue：改变之前的值；newValue：改变之后的值； |
| xxx.valueChange | 某一字段值发生变化事件     | dataTable：此dataTable对应id；rowId：发生改变行的rowId；field：发生改变的field；oldValue：改变之前的值；newValue：改变之后的值； |
| select          | 行选中事件           | indices：选中行对应的index；rowIds：选中行对应的rowId；  |
| unSelect        | 行反选事件           | indices：选反选对应的index；rowIds：选反选对应的rowId；  |
| allSelect       | 选中所有行事件         |                                          |
| allUnselect     | 反选所有行事件         |                                          |
| insert          | 插入行事件           | index：插入行对应的index；rows：所插入的行信息；          |
| update          | 行修改事件           | index：修改行对应的index；rows：所修改的行信息；          |
| delete          | 行删除事件           | indices：删除行对应的index；rowIds：删除行对应的rowId；deleteRows：所删除的行信息； |
| deleteAll       | 删除所有行事件         |                                          |
| focus           | 行获取焦点事件         | index：焦点行对应的index；rowId：焦点行对应的rowId；     |
| unFocus         | 行取消焦点事件         | index：取消焦点行对应的index；rowId：取消焦点行对应的rowId； |
| enableChange    | 可修改属性改变事件       | enable：是否可修改；                            |
| metaChange      | 字段属性信息改变事件      | dataTable：此dataTable对应id；field：发生属性改变的字段；meta：发生改变的属性；oldValue：发生改变之前的值；newValue：发生改变之后的值； |
| rowMetaChange   | Row对象字段属性信息改变事件 | dataTable：此dataTable对应id；field：发生属性改变的字段；meta：发生改变的属性；oldValue：发生改变之前的值；newValue：发生改变之后的值；row：发生属性改变的Row对象 |

---

* **getMeta**

获取字段的属性信息(如：字段类型、精度信息等)

	datatable.getMeta(fieldName, key)

*params:*

`fieldName`: 字段名称

`key` : 属性键值

*return:*

`metaValue`: 属性值 

---

* **setMeta**

设置字段的属性信息

	datatable.setMeta(fieldName, key, value)

*params:*

`fieldName`: 字段名称

`key`: 属性键值

`value`:	属性值

---

* **ref**

以knockout语法做双向绑定，显示当前行的字段值

	<label data-bind="text: dataTable.ref('fieldName')"></label>

*params:*

`fieldName` : 字段名



