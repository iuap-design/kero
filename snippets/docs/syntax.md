# 数据模型绑定语法

数据模型(dataTabe)的绑定是基于knockoutjs的，数据模型做为被绑定的model存在。所以，knockoutjs的绑定语法中都可以使用数据模型。


## 当前行字段值的绑定

	<label data-bind="text: dataTable.ref('name')"></label>

	<input type="text" data-bind="value: dataTable.ref('name')"></input>

dataTable的`ref`方法会返回一个knockout的纯计算监控(pureComputed)。通过这个纯计算监控来实现数据的双向绑定。
常见的触发监控的条件：

+ 当前行改变时(`dataTable.setRowSelect(index)`)
+ 修改当前行数据时(`dataTable.setValue('name','tom')`)
+ 数据载入时(`dataTable.setSimpleData(json)`)
+ 在页面DOM上修改字段值时


## 所有行字段值的绑定

因为所有的行在dataTable中是以数组形式存在，所以要通过knockout的foreach语法来遍历行数组，在foreach中做行(Row)的字段绑定。

    <table id="table1" class="u-table">
        <thead>
        <tr>
            <th>公司</th>
            <th>部门</th>
            <th>姓名</th>
        </tr>
        </thead>
        <tbody data-bind="foreach:{data:dataTable.rows(), as: 'row'}">
        <tr>
            <td data-bind="text:row.ref('enterprise')"></td>
            <td data-bind="text: row.ref('depart')"></td>
            <td data-bind="text: row.ref('name')"></td>
        </tr>
        </tbody>
    </table>
	
row.ref方法同样返回一个knockout的纯计算监控。实现数据与DOM的双向绑定。
常见的触发监控的条件：

+ 数据时(`row.setValue('name','tom')`)
+ 数据载入时(`row.setSimpleData(json)`)
+ 在页面DOM上修改字段值时






