# Bower 浏览器相关



## 移动端改变 chrome 标题栏的颜色

> 要求系统版本好像要到4.2以上，Chrome版本39以上。

原文链接: [developers.google.com][1]

[online-demo][1]

在自己网页的<head></head>标签中加入：

```html
<!-- 16进制颜色值 -->
<meta name="theme-color" content="<!--颜色的HEX代码-->">
```

---



## 浏览器唯一标识符

+ 通过 `IE`

  `js` 想获取设备 `MAC`, `ip` 等信息, 只能通过 IE 浏览器下通过 `ActiveX` 取得, 这是由于 `js` 的安全机制导致

+ 创建一个 `UID`, 类似于 `cookies`

  ```js
  // 这个函数可以生成一个随机guid，碰撞几率可以忽略不计，可以认为是唯一的。
  function generateUUID() {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (d + Math.random()*16)%16 | 0;
    d = Math.floor(d/16);
    return (c=='x' ? r : (r&0x3|0x8)).toString(16);
  });
  return uuid;
  };
  ```


---



## 连接移动端调试技巧

---



## 设置 title 文本信息

```js
document.title = 'hahaha';
```



---

[1]: https://developers.google.com/web/updates/2014/11/Support-for-theme-color-in-Chrome-39-for-Android?hl=en
[2]: https://hodorshy.github.io/example/chrome-title-color.html