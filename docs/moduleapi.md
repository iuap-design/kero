
# API

```html
<div class="u-text"  u-meta='{"id":"f1","data":"dt1","field":"f1","type":"u-text"}'>
    <input class="u-input"/>
</div>
```

`u-meta`为框架特有标记，框架通过识别此标记创建对应UI组件，以及进行数据绑定 ，`u-meta`中的必填项如下：

| 标签    | 说明          |
| ----- | ----------- |
| id    | 创建组件唯一标识    |
| type* | 创建组件对应的类型   |
| data  | 指定数据模型中的数据集 |
| field | 绑定数据集中对应的字段 |

* type用于创建对应的UI组件交互形式，完整类型见下。

  ​

## Type类型

### 数据

| 类型      | 说明      |
| ------- | ------- |
| integer | 整数数字输入框 |
| float   | 浮点数字输入框 |

### 日期

| 类型            | 说明           |
| ------------- | ------------ |
| u-year        | 年份控件         |
| u-month       | 月份输入框        |
| u-yearmonth   | 年份月份控件       |
| u-time        | 时间控件         |
| u-clockpicker | 时间控件，显示为钟表形式 |
| u-date        | 日期输入框        |
| u-datetime*   | 日期时间输入框      |

* `u-date` , `u-datetime` 表示元素为日期时间输入框

  > 时间日期有`format`属性，type为`u-date`时`format`默认为“YYYY-MM-DD”，type为`u-datetime`时`format`默认为“YYYY-MM-DD HH:mm:ss”



### 文本

| 类型       | 说明    |
| -------- | ----- |
| textarea | 文本域   |
| u-text   | 文本输入框 |



### 选择下拉

| 类型          | 说明   |
| ----------- | ---- |
| u-combobox* | 下拉框  |
| u-checkbox* | 复选框  |
| u-radio*    | 单选   |

* `u-combobox` 表示元素为下拉框

  `datasource` 下拉选项对应的数据源,本例为`comboData`,建议定义在viewModel中.

  ```html
  <div class="u-combo u-text" u-meta='{"id":"c1","data":"dt1","field":"f1","type":"u-combobox","datasource":"comboData"}'>
      <input class="u-input"/>
  </div>
  ```

  ​

* `u-checkbox` 表示元素为复选框

  `isGroup` 类型Boolean,默认false.表示是否为复选框组，如果是复选框组则多个元素对应相同的date以及field，选中之后对应不同的value值

  `checkedValue` 表示元素为选中状态对应的value值

  `unCheckedValue` 表示元素为非选中状态对应的value值

  ```html
      <label  class="u-checkbox" u-meta='{"id":"c1","data":"dt1","field":"f1","type":"u-checkbox","isGroup":true,"checkedValue":"test1"}'>
          <input type="checkbox" class="u-checkbox-input">
      </label>
  ```

  ​

* `u-radio` 表示元素为单选.若多个元素设置的data与field一致，则表示为单选组，选择过程中只能选择其中一项。

  ```html
  <label  class="u-radio" for="option-1" u-meta='{"id":"r1","data":"dt1","field":"f1","type":"u-radio"}'>
      <input type="radio" id="option-1" class="u-radio-button" name="options" value="test1">
      <span class="u-radio-label">test1</span>
  </label>
  <label class="u-radio" for="option-2" u-meta='{"id":"r2","data":"dt1","field":"f1","type":"u-radio"}'>
      <input type="radio" id="option-2" class="u-radio-button" name="options" value="test2">
      <span class="u-radio-label">test2</span>
  </label>
  ```




### 进度条

| 类型          | 说明   |
| ----------- | ---- |
| u-progress* | 进度条  |

* `u-progress` 表示元素为进度条，通过设置data中field的值来控制进度条的进度

  ```html
  <div id="p1" class="u-progress" u-meta='{"id":"c1","data":"dt1","field":"f1","type":"u-progress"}'></div>
  ```


### 树

| 类型    | 说明   |
| ----- | ---- |
| tree* | 树控件  |

* `tree` 表示元素为树控件

  `idField` 构建树结构时的id对应的field

  `pidField` 构建树结构时的pid对应的field

  `nameField` 树节点显示值对应的field

  ```html
  <div id="treeTest" class="ztree" u-meta='{"id":"tree2","data":"dataTable1","type":"tree","multiSelect":"true","idField":"id","pidField":"pid","nameField":"title","setting":"treeSetting"}'></div>
  ```

  更多`tree`属性参照:[zTree API Document](http://www.ztree.me/v3/api.php)