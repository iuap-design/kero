
# u.Row

row对象为dataTable中的行对象，可以调用row上发方法获取、设置字段上的值，设置、获取数据源等。


## 属性

### \# rowId

* 类型：`String`
* 说明：获取当前行的属性值rowId
* 用法：

```
row.rowId

```
---
## 方法

### \# setValue

* 类型：`Function`
* 说明： 设置当前行row的字段值
* 用法：

```

row.setValue(fieldName, value);

```

* 参数：

	* fieldName： 字段名称
	* value：需要设置的字段值 


### \# getValue  

* 类型：`Function`
* 说明： 获取当前行row字段的值
* 用法：

```

row.getValue(fieldName);

```

* 参数：

	* fieldName： 字段名称


### \# setSimpleData

* 类型：`Function`
* 说明： 设置当前行row中的数据源
* 用法：

```

var dataSource = {"field1":"v1","field2":"v2"}

row.setSimpleData(dataSource);

```

* 参数：

	* dataSource： 行对象所需的数据源，其值由字段名称和字段值组成。


### \# getSimpleData

* 类型：`Function`
* 说明： 获取当前行row中的数据
* 用法：

```

row.getSimpleData();

```


### \# ref

* 类型：`Function`
* 说明： 以knockout语法做双向绑定，显示此行的字段值
* 用法：

```

<label data-bind="text: row.ref('fieldName')"></label>

```

* 参数：

	* fieldName： 字段名称


### \# refEnum


* 类型：`Function`
* 说明： 以knockout语法做双向绑定，显示此行的字段值为是、否、“”，如果字段值为N，则显示“否”。如果字段值为Y，则显示“是”，其他内容显示为“”。
* 用法：

```

<label data-bind="text: Row.refEnum('fieldName')"></label>

```

* 参数：

	* fieldName： 字段名称

### \# refDate

* 类型：`Function`
* 说明： 以knockout语法做双向绑定,使用时间格式化显示字段值
* 用法：

```

<label data-bind="text: Row.refDate('fieldName',format)"></label>

```

* 参数：

	* fieldName： 字段名称
	* format： 时间格式化


### \# getMeta

* 类型：`Function`
* 说明： 获取当前行row中某一列的属性
* 用法：

```

row.getMeta(fieldName, key)

```

* 参数：

	* fieldName: 字段名称
	* key： 字段对应的属性名称



### \# setMeta

* 类型：`Function`
* 说明： 设置当前行row中某一列的属性
* 用法：

```

row.setMeta(fieldName, key, value)

```

* 参数：

	* fieldName: 字段名称
	* key： 字段对应的属性名称
	* value：字段对应的属性具体值

