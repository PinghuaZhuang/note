# Compatibility



## requireJS

### 避免网页失去响应

```html
<script src="js/require.js" defer async="true" ></script>
```

async: IE 浏览器不支持, 使用 defer. 



## active 伪类

### DESC

在 `ios` 中, 使用伪类 `active` 的时候, 是有可能不会触发样式上的效果

### FIXED

1. 全局注册 `touchstart` 事件

```js
// 解决 ios active 伪类无效的问题
document.body.addEventListener('touchstart', function () { });
```



1. 局部为目标注册 `touchstart` 事件