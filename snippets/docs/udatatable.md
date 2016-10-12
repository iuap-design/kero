# DataTable

## 属性

### \# meta

* 类型：`Object`
* 说明：获取dataTable的所有字段属性信息
* 用法：

```

dataTable.meta

```

---

## 方法

### 创建dataTable

#### \# u.DataTable

* 类型：`Function`
* 说明：创建dataTable
* 用法：

```

var dataTable = new u.DataTable({
	meta:{
		field1:{type:'string'},
		field2:{type:'date'}
	}
})

```

* 参数：

`meta`: 字段信息集合，其中的key为字段名，value为字段属性信息，属性信息可自定义。详情请参考[模型定义](http://design.yyuap.com/dist/pages/kero/datatable.html#模型定义)



### 行操作

#### \# createEmptyRow

* 类型：`Function`
* 说明：创建新行，并追加到dataTable行数据集合的最后。
* 用法：

```

dataTable.createEmptyRow()

```

* 返回值：

`row`：  行对象	



#### \# removeRow

* 类型：`Function`
* 说明：根据索引值或者指定row对象，删除某一行
* 用法：

```

dataTable.removeRow(index)

```
* 参数：

`index` :要删除的行索引或者row对象


#### \# removeRowByRowId

* 类型：`Function`
* 说明：根据行的id来删除行，删除某一行
* 用法：

```

dataTable.removeRowByRowId(rowId)

```
* 参数：

`rowId` :要删除的行id	

#### \# removeRows


* 类型：`Function`
* 说明：根据索引值删除一组行数据
* 用法：

```

dataTable.removeRows(indices)

```
* 参数：

`indices` : 要删除的行索引数组

#### \# removeAllRows

* 类型：`Function`
* 说明：删除所有行数据
* 用法：

```

dataTable.removeAllRows()

```
#### \# getRow

* 类型：`Function`
* 说明：根据索引获取Row对象
* 用法：

```

dataTable.getRow(index)

```

* 参数：

`index` :要获取行的索引


#### \# getRowByRowId

* 类型：`Function`
* 说明：根据行id获取Row对象
* 用法：

```
dataTable.getRow(rowid)

```

* 参数：

`rowid` :要获取行的rowid


#### \# getAllRows

* 类型：`Function`
* 说明：获取所有的Row对象
* 用法：

```
dataTable.getAllRows()

```
#### \# getFocusRow

* 类型：`Function`
* 说明：获取焦点行
* 用法：

```
dataTable.getFocusRow()

```
#### \# getCurrentRow

* 类型：`Function`
* 说明：获取当前行。规则： 焦点行优先，没有焦点行时，取第一选中行
* 用法：

```
dataTable.getCurrentRow()

```

#### \# getSelectedRows

* 类型：`Function`
* 说明：获取所有选中行对象
* 用法：

```
dataTable.getSelectedRows()

```

#### \# getChangedRows

* 类型：`Function`
* 说明：获取所有发生变化的Row对象
* 用法：

```
dataTable.getChangedRows()

```
#### \# getFocusIndex

* 类型：`Function`
* 说明：获取焦点行对应的index
* 用法：

```
dataTable.getFocusIndex()

```

#### \# getSelectedIndexs

* 类型：`Function`
* 说明：获取选中行的index
* 用法：

```
dataTable.getSelectedIndexs()

```

#### \# setRowSelect

* 类型：`Function`
* 说明：根据索引值，设置行选中
* 用法：

```
dataTable.setRowSelect(index)

```
* 参数:

`index` :要选中的行索引


#### \# setRowsSelect


* 类型：`Function`
* 说明：根据一组索引值，设置多行选中
* 用法：

```
dataTable.setRowsSelect(indices)

```
* 参数:

`indices` : 要选中的行索引数组


#### \# addRowSelect


* 类型：`Function`
* 说明：在原有选中行的基础行，追加行选中
* 用法：

```
dataTable.addRowSelect(index)

```
* 参数:

`index` :要选中的行索引


#### \# addRowsSelect

* 类型：`Function`
* 说明：在原有选中行的基础行，追加多行选中
* 用法：

```
dataTable.addRowsSelect(indices)

```
* 参数:

`indices` : 要追加的行索引数组

#### \# setAllRowsSelect

* 类型：`Function`
* 说明：设置所有行为选中状态
* 用法：

```
dataTable.setAllRowsSelect()

```
#### \# setRowUnSelect

* 类型：`Function`
* 说明：根据索引值，设置某行为非选中状态
* 用法：

```
dataTable.setRowUnSelect(index)

```
* 参数:

`index` :要取消选中的行索引



#### \# setRowsUnSelect

* 类型：`Function`
* 说明：根据索引值，设置多行为非选中状态
* 用法：

```
dataTable.setRowsUnSelect(indices)

```
* 参数:

`indices` :行索引数组



#### \# setAllRowsUnSelect

* 类型：`Function`
* 说明：设置所有行为非选中状态
* 用法：

```
dataTable.setAllRowsUnSelect()

```

#### \# setRowFocus

* 类型：`Function`
* 说明：根据索引值，设置焦点行
* 用法：

```
dataTable.setRowFocus(index)

```
* 参数:

`index` :要设置焦点行的索引



#### \# setRowUnFocus

* 类型：`Function`
* 说明：设置焦点行为非焦点状态
* 用法：

```
dataTable.setRowUnFocus()

```


### 数据操作


#### \# getSimpleData

* 类型：`Function`
* 说明：获取dataTable中的数据
* 用法：

```

//默认获取所有数据
dataTable.getSimpleData()

//获取选中行的字段： field1,field2数据
dataTable.getSimpleData({type:'select',fields:['field1,field2']})

```

* 参数：

`type`：获取指定类型的数据

| 类型      | 作用        |
| ------- | --------- |
| all     | 所有行的数据    |
| current | 当前行的数据    |
| focus   | 焦点行的数据    |
| select  | 被选中的行的数据  |
| change  | 发生改变的行的数据 |

`fields`：获取指定字段的数据

* 返回值：

`datas`：  数据数组	

#### \# setSimpleData

* 类型：`Function`
* 说明：设置dataTable中的数据，将原有数据清除。默认会选中第一行。
* 用法：

```
//给dataTable添加数据源，默认会选中第一行
dataTable.setSimpleData([
	{"field1":"v1","field2":"v2"},
	{"field1":"v3","field2":"v4"}
])

//取消默认的选中行
dataTable.setSimpleData([
	{"field1":"v1","field2":"v2"},
	{"field1":"v3","field2":"v4"}
],{unSelect:true})
```

* 参数：

`{Array} data`：数据源

`{Object} options`： 根据参数具体内容来设置数据源。例如：
`{unSelect:true}`表示不选中第一行。


#### \# addSimpleData

* 类型：`Function`
* 说明：在原有数据基础上，添加数据
* 用法：

```
dataTable.addSimpleData([
	{"field1":"v1","field2":"v2"},
	{"field1":"v3","field2":"v4"}
])
```

#### \# clear

* 类型：`Function`
* 说明：清除dataTable中的所有数据
* 用法：

```
dataTable.clear()
```

#### \# setValue

* 类型：`Function`
* 说明：设置当前行的字段值
* 用法：

```
datatable.setValue(fieldName, value)

```

* 参数：

`fieldName` : 字段名称

`value`:　字段值   



#### \# getValue  

* 类型：`Function`
* 说明：获取当前行字段的值
* 用法：

```
datatable.getValue(fieldName)

```

* 参数：

`fieldName`: 字段名  

* 返回值:

`value`: 字段值	


#### \# ref

* 类型：`Function`
* 说明：以knockout语法做双向绑定，显示当前行的字段值
* 用法：

```
<label data-bind="text: dataTable.ref('fieldName')"></label>

```

* 参数：

`fieldName`: 字段名称


### 操作dataTable相关方法


#### \# getMeta

* 类型：`Function`
* 说明：获取字段的属性信息(如：字段类型、精度信息等)
* 用法：

```
datatable.getMeta(fieldName, key)

```

* 参数：

`fieldName`: 字段名称

`key` : 属性键值

* 返回值:

`metaValue`: 属性值 



#### \# setMeta


* 类型：`Function`
* 说明：设置字段的属性信息
* 用法：

```
datatable.setMeta(fieldName, key, value)

```

* 参数：

`fieldName`: 字段名称

`key`: 属性键值

`value`:	属性值




#### \# setEnable


* 类型：`Function`
* 说明：设置dataTable是否可编辑
* 用法：

```
dataTable.setEnable()

```

#### \# isEnable

* 类型：`Function`
* 说明：获取dataTable是否可编辑。如果传入field则获取对应field是否可编辑
* 用法：

```
dataTable.isEnable() 或 dataTable.isEnable('filed1')

```

*参数:

`field` :判断field是否可编辑（可选）


## 事件

## on


* 类型：`Function`
* 说明：添加相应的事件监听
* 用法：

```
datatable.on(eventName, callBack)

```
* 参数：

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





