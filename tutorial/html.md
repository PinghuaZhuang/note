# Html window

记录跟 html 有关的知识.



## onunload 与 onbeforeunload

[原文链接][1]

+ onunload: 在退出页面的时候出发
+ onbeforeunload: 在退出页面和页面刷星的时候触发

> 有兼容问题



## * onVisibilitychange

[原文链接1][3]: 在后台停止播放音乐, 在前台就播放音乐

[原文链接2][4]: 检测页面是否被可见( 页面是否处于后台 )

[online-demo][5]

visibilitychange 事件是浏览器新添加的一个事件，当浏览器的某个标签页切换到后台，或从后台切换到前台时就会触发该消息，现在主流的浏览器都支持该消息了，例如Chrome, Firefox, IE10等

visibilitychange 可以检测是否处于后台, document 的一个属性

```js
// 注册事件, 有兼容问题, 加前缀
document.addEventListener( 'visibilitychange', function () {} );
```

```js
// 获取document.visibilityState属性
function getVisibilityState() {
    var prefixes = ['webkit', 'moz', 'ms', 'o'];
    if ('visibilityState' in document) return 'visibilityState';
    for (var i = 0; i < prefixes.length; i++) {
        if ((prefixes[i] + 'VisibilityState') in document)
            return prefixes[i] + 'VisibilityState';
    }
    // otherwise it's not supported
    return null;
};
```





## onpagehide

[原文链接][2]

用户从一个页面离开的时候触发. 

用户离开页面的时机有:

+ 点击一个链接
+ 跟新页面
+ 提交表单( 不阻止默认行为的时候 )
+ 关闭浏览器窗口

有时, onpagehide 可以代替 onunload 事件.

### 如何判断页面是否缓存

可以使用 PageTransitionEvent 对象的 persisted 属性来检测页面是从服务器下载的或是缓存的, 如果缓存了页面, 返回 true, 否则, 返回 false.



---

[1]: https://blog.csdn.net/ityang521/article/details/76076813
[2]: http://webkkl.com/dom-events/onpagehide.php
[3]: https://blog.csdn.net/yl02520/article/details/17174107
[4]: https://blog.csdn.net/littlebearGreat/article/details/79207215
[5]: https://hodorshy.github.io/example/%E9%A1%B5%E9%9D%A2%E5%88%87%E5%88%B0%E5%90%8E%E5%8F%B0%E6%A3%80%E6%B5%8B.html