# Compatibility

## CommonJS、AMD、CMD、NodeJs、RequireJS

[原文][]

---



## 编写插件的时候, window 要使用 this

`window` 在 `node` 环境中不存在, `eslint` 会报错的.



----



## input 标签

有时候 `$( 'input ).prop( 'checked', false )` 会失效, 可以直接删除该属性



---



## requireJS

### plugins

text和image插件，则是允许require.js加载文本和图片文件。

### 避免网页失去响应

```html
<script src="js/require.js" defer async="true" ></script>
```

async: IE 浏览器不支持, 使用 defer. 

---



## active 伪类

### DESC

在 `ios` 中, 使用伪类 `active` 的时候, 是有可能不会触发样式上的效果

### FIXED

1. 全局注册 `touchstart` 事件

```js
// 解决 ios active 伪类无效的问题
document.body.addEventListener('touchstart', function () { });
```

2. 局部为目标注册 `touchstart` 事件



---



## Visual Studio Code 

Visual Studio Code 装饰器提示“experimentalDecorators”的解决办法

```json
{
    "javascript.implicitProjectConfig.experimentalDecorators": true
}
```



---



## IE 下不支持的方法

+ `fill()`



---

[1]: https://blog.csdn.net/fabulous1111/article/details/73431382