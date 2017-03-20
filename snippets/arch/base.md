## Kero初衷

Kero是希望基于NeoUI组件，快速实现数据绑定，提供完整前端解决方案。以下介绍前端发展，及流行的框架设计模式。



### 浏览器格局

20世纪90年代，网景公司发布了Navigator浏览器，实现了内容的展示。为满足市场更多需求，网景仓促发布了：Javascript。

浏览器的一时风靡，微软也很快推出自己的桌面浏览器Internet Exploer。凭借着承诺永久免费，率先支持CSS等新标准，IE迅速占领了市场，也宣告了网景浏览器的终结。

开源方面的后起之秀随之也获得了强势的发展和极高的拥趸，以下为目前浏览器情况。

![浏览器市场占有率](/assets/static/img/all/mainbrowser.png)



### jQuery

浏览器的纷争，对标准的实现也不尽相同，jQuery为我们实现了：

* 解决跨浏览器兼容
* DOM选择器
* 链式表达式，让书写代码变得有趣
* 简化AJAX操作
* 生态完善，海量插件

总体就是降低了前端的学习成本，提高了项目的效率。

JavaScript 过于灵活，代码的组织过于零散，一旦需求变得复杂， JavaScript 代码将变得难以维护。特别是崇尚快速开发、快速试错的开发模式，臃肿、难以组织和维护的 JavaScript 代码成了一个需要重要解决的问题。



### 设计模式

设计模式常见的有MVC，MVP，MVVM。有关他们的介绍，引用阮一峰的[MVC，MVP 和 MVVM 的图示](http://www.ruanyifeng.com/blog/2015/02/mvcmvp_mvvm.html)：

#### MVC

MVC模式的意思是，软件可以分成三个部分。

![img](http://image.beekka.com/blog/2015/bg2015020104.png)

> - 视图（View）：用户界面。
> - 控制器（Controller）：业务逻辑
> - 模型（Model）：数据保存

各部分之间的通信方式如下。

![img](http://image.beekka.com/blog/2015/bg2015020105.png)

> 1. View 传送指令到 Controller
> 2. Controller 完成业务逻辑后，要求 Model 改变状态
> 3. Model 将新的数据发送到 View，用户得到反馈

所有通信都是单向的。

#### 互动模式

接受用户指令时，MVC 可以分成两种方式。一种是通过 View 接受指令，传递给 Controller。

![img](http://image.beekka.com/blog/2015/bg2015020106.png)

另一种是直接通过controller接受指令。

![img](http://image.beekka.com/blog/2015/bg2015020107.png)

#### 实例：Backbone

实际项目往往采用更灵活的方式，以 [Backbone.js](http://documentcloud.github.com/backbone) 为例。

![img](http://image.beekka.com/blog/2015/bg2015020108.png)

\1. 用户可以向 View 发送指令（DOM 事件），再由 View 直接要求 Model 改变状态。

\2. 用户也可以直接向 Controller 发送指令（改变 URL 触发 hashChange 事件），再由 Controller 发送给 View。

\3. Controller 非常薄，只起到路由的作用，而 View 非常厚，业务逻辑都部署在 View。所以，Backbone 索性取消了 Controller，只保留一个 Router（路由器） 。

#### MVP

MVP 模式将 Controller 改名为 Presenter，同时改变了通信方向。

![img](http://image.beekka.com/blog/2015/bg2015020109.png)

\1. 各部分之间的通信，都是双向的。

\2. View 与 Model 不发生联系，都通过 Presenter 传递。

\3. View 非常薄，不部署任何业务逻辑，称为"被动视图"（Passive View），即没有任何主动性，而 Presenter非常厚，所有逻辑都部署在那里。

#### MVVM

MVVM 模式将 Presenter 改名为 ViewModel，基本上与 MVP 模式完全一致。

![img](http://image.beekka.com/blog/2015/bg2015020110.png)

唯一的区别是，它采用双向绑定（data-binding）：View的变动，自动反映在 ViewModel，反之亦然。[Angular](https://angularjs.org/) 和 [Ember](http://emberjs.com/) 都采用这种模式。



参考链接

[MVC，MVP 和 MVVM 的图示](http://www.ruanyifeng.com/blog/2015/02/mvcmvp_mvvm.html)
