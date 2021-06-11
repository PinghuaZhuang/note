# 监听dom元素是否在viewport内

可视区域

https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver

```js
var intersectionObserver = new IntersectionObserver(function(entries) {
  // If intersectionRatio is 0, the target is out of view
  // and we do not need to do anything.
  if (entries[0].intersectionRatio <= 0) return;
}, {
    // 可见区域一半
    threshold: 0.5
});
// start observing
intersectionObserver.observe(document.querySelector('.scrollerFooter'));
```



# URL 拼接 path.join

```js
pathJoin(...rest) {
    const parths = rest.join('/')
    return parths
      // '//' '/./' => '/'
      .replace(/((?<!\:)\/(\/)+)|(\/+\.\/+)/g, '/')
      // '/*/../' => '/'
      .replace(/\/[^\/]*?\/\.\.\//g, '/')
  },
```

