# DataTable后端使用
后端DataTable主要是在后端的Controller里面操作DataTable类提供的api来达到更新前端页面的效果，这样就达到了前后台一体化开发的目的。
## 后端DataTable的基本使用
### 使用的例子
先来看一个常用的例子，下面的代码是实现分页的后端Controller的代码。

``` java
@RequestMapping(value = "initDb", method = RequestMethod.POST)
public @ResponseBody EventResponse initDt(@IWebParameter(id = "data1") DataTable<ProdSpecHPOJO> data1,
		@IWebParameter() EventResponse response) throws Exception {
	//准备分页信息
	PagePOJO page = new PagePOJO();
	page.setCurrentPage(data1.getPageIndex());
	page.setPageSize(data1.getPageSize());

	//查询条件
	ProdSpecQueryParameter psqp = new ProdSpecQueryParameter();
	//查询数据
	PageBean<ProdSpecHPOJO> pagebean = prodSpecService.queryPageByCondition(page, psqp);
	@SuppressWarnings("unchecked")
	List<ProdSpecHPOJO> resultList = (List<ProdSpecHPOJO>) pagebean.getResultList();

	data1.set(resultList.toArray(new ProdSpecHPOJO[resultList.size()]));
	Long totalpage = pagebean.getTotalPage();
	data1.setTotalPages(totalpage.intValue());
	return response;

}
```
后端的DataTable对象通过注解的方式可以直接获得；通过datatable.getPageIndex()和datatable.getPageSize()可以获得datatable上的分页信息；datatable.set()方法可以直接将一个普通的java对象数组转化成datatable上的行数据;datatable.setTotalPages()可以设置分页信息。   
这就是后端datatable基本使用方法。
## DataTable api
### 基本属性
##### getId
获取id
##### setId
设置取id

##### getParams
获取datatable上的设置的参数

##### setParams
设置datatable上的设置的参数

### 基本的增删改查
##### getRow
根据rowid获取row

##### getSelectRow
获取所有选中行

##### getFocusRow
获取聚焦行

##### getCurrentRow
获取当前行，当前行为聚焦行，如果聚焦行不存在，则取选中行

##### getAllRow
获取datatable上的所有行

##### getAllPagesRow
获取所有页上的所有行

##### addRow
增加一行

##### addRows
增加多行

##### remove
可以传入一个普通java对象或者对象数组或者Row对象

##### createEmptyRow
生成一个新行

### meta相关

##### getMeta
获取meta信息

##### setMeta
设置meta

##### updateMeta
更新meta信息




### VO相关
##### set
这个方法是一个比较常用的方法，可以传入一个ISetRowHandler参数，它提供了两个方法beforSet和afterSet，可以在每增加一行之前或之后做一些处理。

##### getAll
获取所有的行

##### getFocusPuppet
获取聚焦行的vo

##### getSelectPuppet
获取所有选中行的vo

##### getT
将row对象转化成vo

##### remove
删除vo对应的row

##### getCls
获取vo的类名

##### setCls
设置vo类名







### 分页有关方法
##### getPageIndex
获取当前页号
##### setPageIndex
设置当前页号
##### getPageSize
获取一页的行数
##### setPageSize
设置一页的行数
##### getTotalPage
获取页数
##### setTotalPage
设置页数
##### getPage
获取某一页
##### addPage
增加一页
##### removePage
删除某一页

### 其他
##### breed
克隆一个新的datatable
##### isBread
是否是克隆出来的

## 3. Row api
##### getId
获取id

##### setId
设置id

##### getEntity
获取datatable

##### setEntity
设置datatable

##### setData
设置row上的数据

##### getField
获取某个字段
##### addField
添加一个字段
##### getFields
获取所有字段

##### getChangedFields
获取所有字段值改变过的字段

##### getStatus
获取行的状态

##### setStatus
设置行的状态

## 4. Field api
##### getFid
获取字段id
##### setFid
设置字段id
##### getValue
获取字段值
##### setValue
设置字段值
##### getMeta
获取meta
##### setMeta
设置meta
##### setDesc
添加meta项
##### getRow
获取字段所在的行
##### setRow
设置字段的行