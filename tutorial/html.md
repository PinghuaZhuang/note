# Html window

记录跟 html 有关的知识.



## onunload 与 onbeforeunload

[原文链接][1]

+ onunload: 在退出页面的时候出发
+ onbeforeunload: 在退出页面和页面刷星的时候触发

> 有兼容问题

---



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

---



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



## HTML 页面加载顺序

[原文链接][6]

1. 解析HTML结构
2. 加载外部脚本和样式表文件
3. 解析并执行脚本代码
4. DOM树构建完成. // DOMContentLoaded
5. 加载图片等外部文件
6. 页面加载完毕. // load

其实，这里还有一个readystatechange事件。
 当document.readyState 为 interactive 的时候，同时会触发DOMContentLoaded。
 当document.readyState 为 complete 的时候，同时会触发load。

以后如需判断当前文档是否加载完成，只需要获取document.readyState的值即可。

---



## iframe

### iframe 下获取 window 对象

[文章][7]

```html
<iframe id="ct" class="ct-class" name="ctName"></iframe>
```



1. 来获取 iframe 元素
   a. 通过 id 获取

   ```js
   var iframe = window.ct;
   ```

   b. 通过 name 徐行获取

   ```js
   var iframe = window.frames[ "ctName" ];
   ```

   c. 普通的获取

2. contentWindow 属性: 获取 iframe 下面的 window 对象

3. ownerDocument 属性: 获取 iframe 下面的 document 对象

---



## A 标签下载

[原文链接][7]

利用 a 标签的 `download` 属性来下载.

### Blob 对象简单介绍

```js
var blob = new Blob( array, options );
```

+ array 是一个由ArrayBuffer（二进制数据缓冲区）、ArrayBufferView（二进制数据缓冲区的array-like视图）、Blob、DOMString等对象构成的Array，或者其他类似对象的混合体，它将会被放进Blob。DOMStrings会被编码为UTF-8。
+ options 是可选的，它可能会指定如下两个属性：
  - type，默认值为 ""，它代表了将会被放入到blob中的数组内容的MIME类型。
  - endings，默认值为"transparent"，用于指定包含行结束符n的字符串如何被写入。 它是以下两个值中的一个： "native"，代表行结束符会被更改为适合宿主操作系统文件系统的换行符，或者 "transparent"，代表会保持blob中保存的结束符不变。

```js
var data = 'ttttttssssssss';
var blob = new Blob( [ data ], {
    type: 'text/plain'
} );
```

> 关于 type 的类型可以对照 [MIME 参考手册][9] 设置type

### URL 对象

通过 URL 对象创建下载链接

```js
var urlObj = window.URL.createObjectURL( blob );
```

#### window.URL.revokeObjectURL()

在每次调用createObjectURL()方法时，都会创建一个新的 URL 对象，即使你已经用相同的对象作为参数创建过。当不再需要这些 URL 对象时，每个对象必须通过调用 URL.revokeObjectURL()方法来释放。浏览器会在文档退出的时候自动释放它们，但是为了获得最佳性能和内存使用状况，你应该在安全的时机主动释放掉它们。

### 利用 A 标签下载

```js
var a = document.querySelector( '#a' );

    console.log( { a } );

    function download ( data ) {

        var blob = new window.Blob( [ data ], {
            type: 'text/plain'
        } );

        var urlObj = window.URL.createObjectURL( blob );

        a.href = urlObj;
        a.download = 'xxxx.txt';
    }

    download( 'salkfja;lkfja;lkjsdflkajsdflkajsfdlkajsfdlaksf' );
```

---



## 新单位 vw vh vmin vmax

[原文链接][10]

+ 含义

  `vw`, `vh`, `vmin`, `vmax` 是一种相对于视窗( viewport )的单位, 类似于百分比 , 视窗是指浏览器时机显示内容区域的大小, 不包括工具栏等.

  `vw`: 视窗宽度的百分比

  `vh`: 视窗高度的百分比

  `vmin`: 视窗高度和视窗宽度的较小值

  `vmax`: 视窗高度和视窗宽度的较大值

+ 与百分比单位的区别

  1. % 是相对于父元素的大小设定的比率, `vw`, `vh` 是由视窗决定的.
  2. `vw`, `vh` 是可以直接获取高度的, 但是 % 在没有设置 `body` 高度的情况下, 获取不到.

+ `vmin`, `vmax` 的用处

  在做移动端的横竖屏切换的时候, 可以使得文字大小在横竖屏下表现一致.

+ 浏览器兼容

  1. PC端

     Chrome：自 26 版起就完美支持（2013年2月）
     Firefox：自 19 版起就完美支持（2013年1月）
     Safari：自 6.1 版起就完美支持（2013年10月）
     Opera：自 15 版起就完美支持（2013年7月）
     IE：自 IE10 起（包括 Edge）到现在还只是部分支持（不支持 vmax，同时 vm 代替 vmin）

  2. 移动端

     Android：自 4.4 版起就完美支持（2013年12月）
     iOS：自 iOS8 版起就完美支持（2014年9月）

---





---

[1]: https://blog.csdn.net/ityang521/article/details/76076813
[2]: http://webkkl.com/dom-events/onpagehide.php
[3]: https://blog.csdn.net/yl02520/article/details/17174107
[4]: https://blog.csdn.net/littlebearGreat/article/details/79207215
[5]: https://hodorshy.github.io/example/%E9%A1%B5%E9%9D%A2%E5%88%87%E5%88%B0%E5%90%8E%E5%8F%B0%E6%A3%80%E6%B5%8B.html

[6]: https://www.jianshu.com/p/5c86c51a166e

[7]: https://www.cnblogs.com/TiestoRay/p/2660524.html
[8]: https://segmentfault.com/a/1190000015026760
[9]: http://www.w3school.com.cn/media/media_mimeref.asp
[10]: https://www.jb51.net/css/589835.html