<a name="3.2.5"></a>
## [3.2.5](https://github.com/iuap-design/kero/compare/v3.2.4...v3.2.5) (2017-08-04)


### Features

* 给row.setValue增加validType判断 ([3e15ca4](https://github.com/iuap-design/kero/commit/3e15ca4))



<a name="3.2.4"></a>
## [3.2.4](https://github.com/iuap-design/kero/compare/v3.2.3...v3.2.4) (2017-06-22)


### Bug Fixes

* 修改eq方法的==为=== ([b1b390a](https://github.com/iuap-design/kero/commit/b1b390a))


### Features

* datatable对象的getSimpleData支持跨页选择后获取选中数据 ([3fae27e](https://github.com/iuap-design/kero/commit/3fae27e))



<a name="3.2.3"></a>
## [3.2.3](https://github.com/iuap-design/kero/compare/v3.2.2...v3.2.3) (2017-05-23)


### Bug Fixes

* 解决dataTable的off操作无法清除之前绑定的事件的问题 ([6a8bf1f](https://github.com/iuap-design/kero/commit/6a8bf1f))


### Features

* datatable增加参数forceDel，可不考虑状态强制删除数据 ([2ee566f](https://github.com/iuap-design/kero/commit/2ee566f))



<a name="3.2.2"></a>
## [3.2.2](https://github.com/iuap-design/kero/compare/v3.2.1...v3.2.2) (2017-04-21)


### Bug Fixes

* dataTable选中某行，修改readme ([ba5d7bc](https://github.com/iuap-design/kero/commit/ba5d7bc))
* 修改产出文件名称 ([36cf7d2](https://github.com/iuap-design/kero/commit/36cf7d2))
* 解决focus为最后一行，删除最后一行之后重新设置为新的最后一行时无法生效的问题 ([f3d0d77](https://github.com/iuap-design/kero/commit/f3d0d77))


### Features

* addSimpleData增加参数控制是否选中第一行 ([2aa0a3f](https://github.com/iuap-design/kero/commit/2aa0a3f))
* datatable、row文档完善属性说明 ([0c30e86](https://github.com/iuap-design/kero/commit/0c30e86))
* datatable增加resetAllValue、resetValueByRow，row增加setStatus、resetValue用以支持重置数据的业务需求 ([5b13898](https://github.com/iuap-design/kero/commit/5b13898))
* resetAllValue增加判断状态，如果为新增则删除此数据，如果为删除则新增此数据，如果为更新则还原数据 ([b868324](https://github.com/iuap-design/kero/commit/b868324))
* 优化子表获取字段逻辑，没有当前行的情况下获取第一行 ([f077032](https://github.com/iuap-design/kero/commit/f077032))
* 增加API getRowsByIndices ([170e590](https://github.com/iuap-design/kero/commit/170e590))



<a name="3.1.27"></a>
## [3.1.27](https://github.com/iuap-design/kero/compare/v3.1.26...v3.1.27) (2017-02-23)



<a name="3.1.26"></a>
## [3.1.26](https://github.com/iuap-design/kero/compare/v3.1.25...v3.1.26) (2017-02-20)



<a name="3.1.25"></a>
## [3.1.25](https://github.com/iuap-design/kero/compare/v2.1.22...v3.1.25) (2017-02-10)


### Bug Fixes

* dataTable选中行 ([e29ed5d](https://github.com/iuap-design/kero/commit/e29ed5d))



<a name="2.1.22"></a>
## [2.1.22](https://github.com/iuap-design/kero/compare/v2.1.21...v2.1.22) (2017-01-10)


### Bug Fixes

* row-util ([4fba275](https://github.com/iuap-design/kero/commit/4fba275))



<a name="2.1.19"></a>
## [2.1.19](https://github.com/iuap-design/kero/compare/v2.1.18...v2.1.19) (2016-12-28)


### Bug Fixes

* 优化前端新增删除数据时总条数的显示 ([880e77e](https://github.com/iuap-design/kero/commit/880e77e))



<a name="2.1.18"></a>
## [2.1.18](https://github.com/iuap-design/kero/compare/v2.1.17...v2.1.18) (2016-12-20)



<a name="2.1.17"></a>
## [2.1.17](https://github.com/iuap-design/kero/compare/v2.1.16...v2.1.17) (2016-12-09)


### Bug Fixes

* 修改dataTable默认的总页数 ([be858ce](https://github.com/iuap-design/kero/commit/be858ce))



<a name="2.1.16"></a>
## [2.1.16](https://github.com/iuap-design/kero/compare/v2.1.15...v2.1.16) (2016-12-08)


### Bug Fixes

* fieldFlag变量不起作用 ([8acf508](https://github.com/iuap-design/kero/commit/8acf508))
* fire操作默认使用$的ajax ([46d95d6](https://github.com/iuap-design/kero/commit/46d95d6))
* getSimpleData如果为undefined按原值返回 ([c7b3135](https://github.com/iuap-design/kero/commit/c7b3135))
* getSimpleData返回值应该和传入值保持一致 ([e981df4](https://github.com/iuap-design/kero/commit/e981df4))
* valuechange的trigger增加参数rowObj存储当前的row对象 ([2654da4](https://github.com/iuap-design/kero/commit/2654da4))



<a name="2.1.15"></a>
## [2.1.15](https://github.com/iuap-design/kero/compare/v2.1.14...v2.1.15) (2016-12-01)



<a name="2.1.14"></a>
## [2.1.14](https://github.com/iuap-design/kero/compare/v2.1.13...v2.1.14) (2016-11-29)


### Bug Fixes

* datatable支持前端缓存，datatable存储当前页数据，page中存储每页的数据 ([b464a09](https://github.com/iuap-design/kero/commit/b464a09))



<a name="2.1.13"></a>
## [2.1.13](https://github.com/iuap-design/kero/compare/v2.1.12...v2.1.13) (2016-11-17)



<a name="2.1.12"></a>
## [2.1.12](https://github.com/iuap-design/kero/compare/v2.1.9...v2.1.12) (2016-11-17)



<a name="2.1.8"></a>
## [2.1.8](https://github.com/iuap-design/kero/compare/v2.1.7...v2.1.8) (2016-11-14)



<a name="2.1.7"></a>
## [2.1.7](https://github.com/iuap-design/kero/compare/v3.1.1...v2.1.7) (2016-11-08)


### Bug Fixes

* IUAPDESIGN-69:营销物业管理：u-meta定义方式需要支持指定数据行 ([b40b214](https://github.com/iuap-design/kero/commit/b40b214))
* pro-IUAPDESIGN-242:广信中移动项目：grid提供数据改变之前进行判断是否修改的接口 ([7246dbc](https://github.com/iuap-design/kero/commit/7246dbc))
* pro-IUAPDESIGN-246:友云采：datatable设置选中行之后获取时不正确 ([f02049c](https://github.com/iuap-design/kero/commit/f02049c))
* pro-IUAPDESIGN-66:数字营销：getSimpleData方法会自动将date字符串转换为毫秒数 ([bf80d3d](https://github.com/iuap-design/kero/commit/bf80d3d))


### Features

* dateTime yearmonth文档 ([46b1826](https://github.com/iuap-design/kero/commit/46b1826))



<a name="3.1.1"></a>
## [3.1.1](https://github.com/iuap-design/kero/compare/v3.0.6...v3.1.1) (2016-10-17)


### Bug Fixes

* _method error ([bb03148](https://github.com/iuap-design/kero/commit/bb03148))



<a name="3.0.6"></a>
## 3.0.6 (2016-07-04)



