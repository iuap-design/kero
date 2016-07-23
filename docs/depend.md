# Kero依赖关系

## 兼容IE8

如需兼容IE8,需要在引入其他JS文件之前加载`u-polyfill.js`

```javascript
<!--[if lte IE 8]>
  <script src="http://design.yyuap.com/static/uui/latest/js/u-polyfill.js"></script>
<![endif]-->
```

## 引入依赖及核心文件

```javascript
<!--引入jquery依赖-->
<script src="http://design.yyuap.com/static/jquery/jquery-1.9.1.min.js"></script>

<!--引入knockout依赖-->
<script src="http://design.yyuap.com/static/knockout/knockout-3.2.0.debug.js"></script>

<!--引入核心js文件-->
<script src="http://design.yyuap.com/static/uui/latest/js/u.js"></script>
```



