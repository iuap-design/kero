## 获取 `Kero` 资源

kero资源已打包在`u.js`中，配合`u.css` ， 依赖`jquery`实现完整前端UI方案。

如需使用到grid，tree相关插件，可选择添加对应的`css`和`js`文件，页面结构如下：

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">

  <!-- 整体样式u.css,必须引入 -->
  <link rel="stylesheet" href="//design.yonyoucloud.com/static/uui/latest/css/u.css">

  <!-- 可选：使用grid图表相关插件，加载grid.css -->
  <link rel="stylesheet" type="text/css" href="//design.yonyoucloud.com/static/uui/latest/css/grid.css">

  <!-- 可选：使用tree相关插件，加载tree.css -->
  <link rel="stylesheet" type="text/css" href="//design.yonyoucloud.com/static/uui/latest/css/tree.css">
</head>
<body>
  <h1> Hi, iuap design </h1>

  <!-- 你的代码 -->

  <!-- 依赖jQuery,必须在核心js加载前引入 -->
  <script src="//design.yonyoucloud.com/static/jquery/jquery-1.11.2.js"></script>

  <!--[if lte IE 8 ]>
  <!-- 针对ie8,Polyfill -->
  <script src="//design.yonyoucloud.com/static/uui/latest/js/u-polyfill.js"></script>
  <![endif]-->

  <!-- 核心js 必须引入 -->
  <script src="//design.yonyoucloud.com/static/uui/latest/js/u.js"></script>

  <!-- 可选：使用grid图表相关插件，加载u-grid.js -->
  <script src="//design.yonyoucloud.com/static/uui/latest/js/u-grid.js"></script>

  <!-- 可选：使用tree相关插件，加载u-tree.js -->
  <script src="//design.yonyoucloud.com/static/uui/latest/js/u-tree.js"></script>

</body>
</html>
```
完整资源可通过以下方式获取

### 1.直接下载资源包

可通过官网首页点击下载资源，获得完整资源包(包含空页面及所需样式)，下载地址

```
http://design.yonyoucloud.com/static/download/iuap-design-3.1.12.zip
```
核心文件`u.js`可通过以下方式获取

### 1.通过CDN引用

```
<script src="http://design.yonyoucloud.com/static/uui/latest/js/u.js"></script>
```

### 2.获取Kero源码

```
$ git clone git@github.com:iuap-design/kero.git
```

### 3.NPM

```
$ npm install kero --save
```
