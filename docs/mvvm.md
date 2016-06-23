# MVVM简介

##MVVM组成

MVVM是Model-View-ViewModel的简写.Model-View-ViewModel 就是将其中的 View 的状态和行为抽象化，让我们可以将UI和业务逻辑分开。MVVM模式是通过以下三个核心组件组成，每个都有它自己独特的角色：

+ Model - 包含了业务和验证逻辑的数据模型
+ View - 定义屏幕中View的结构，布局和外观
+ ViewModel - 扮演“View”和“Model”之间的使者，帮忙处理 View 的全部业务逻辑

##MVVM与MVC区别

那这和我们曾经用过的MVC模式有什么不同呢？以下是MVC的结构

+ View 在 Controller 的顶端，而 Model 在 Controller 的底部
+ Controller 需要同时关注 View 和 Model
+ View 只能知道 Model 的存在并且能在Model的值变更时收到通知

MVVM模式和MVC有些类似，但有以下不同：

+ ViewModel 替换了 Controller，在UI层之下
+ ViewModel 向 View 暴露它所需要的数据和指令对象
+ ViewModel 接收来自 Model 的数据

##模式概述

这两种模式有着相似的结构，但新加入的 ViewModel 是用不同的方法将组件们联系起来的，它是双向的，而MVC只能单向连接。概括起来，MVVM是由MVC发展而来 - 通过在 Model 之上而在 View 之下增加一个非视觉的组件将来自 Model 的数据映射到 View 中。

参考链接 [MVVM 模式介绍](https://github.com/xitu/gold-miner/blob/master/TODO%2Fapproaching-android-with-mvvm.md)