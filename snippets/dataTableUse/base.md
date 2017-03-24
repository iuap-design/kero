## 基础设置

设置基本的校验、格式化、添加事件监听。

### 校验


在创建dataTable时进行校验设置

```
/**
 ### 校验类型说明：
 *  precision: 精度
 *  max: 数字最大值
 *  min: 数字最小值
 *  maxLength: string最大长度
 *  minLength: string最小长度
 *  required: 必填
 */

var dataTable1 = new u.DataTable({
    meta:{
    f1:{type:'string',maxLength:8,minLength:3},
    f2:{type:'float', precision:2,max:500,min:100},
    f3:{type:'integer', required:true,regExp:/^[0-9]{6}$/},
    f4:{type:'string',required:true}

});
```



---

### 格式化

示例如下：​

```
var dataTable1 = new u.DataTable({
    meta:{
    f1:{type:'date',format:'YYYY-MM-DD'},
    f2:{type:'date',format:'YYYY/MM/DD'}
});
```

---


### 添加事件监听

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


更多设置参见 [u.DataTable](http://docs.tinper.org/moy/kero-api.html#DataTable-object)

---

### Example
