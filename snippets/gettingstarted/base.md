## 起步

### 引入Kero文件及相关依赖

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Kero Getting Started</title>
</head>
<body>

  <script src="http://design.yyuap.com/static/jquery/jquery-1.9.1.min.js"></script>
  <!--引入knockout依赖-->
  <script src="http://design.yyuap.com/static/knockout/knockout-3.2.0.debug.js"></script>
  <!--引入核心js文件-->
  <script src="http://design.yyuap.com/static/uui/latest/js/u.js"></script>
</body>
</html>
```

### 兼容IE8

如需兼容IE8,需要在引入其他JS文件之前加载`u-polyfill.js`

```javascript
<!--[if lte IE 8]>
  <script src="http://design.yyuap.com/static/uui/latest/js/u-polyfill.js"></script>
<![endif]-->
```

### 快速上手

绑定数据
