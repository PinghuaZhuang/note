# Compatibility

## 视频不能自动播放的问题

1. 将标签静音

   注意: 这种方法不一定能实现. muted 属性不一定设置成功. 推荐第二种方法.

   ```html
   <video ref="video" id="player"
          autoplay loop muted>
       <source src="/static/video/scene1.mp4" />
   </video>
   ```

2. 使用 js 来实现.

   play() 方法将会返回一个 promise 方法, muted 属性不一定能设置成功.

   ```js
   this.$refs.video.play().catch( () => {
       // Autoplay was prevented.
   
       //--静音再播放--
       this.$refs.video.muted = true
       this.$refs.video.play()
   } )
   ```

chrome 在 2018.04 月份的时候, 为了提高用户体验, 禁止 video 标签在不禁音的时候自动播放. 需要通过用户交互后再可以.

在禁音的时候, 可以自动播放. 可以通过自动 play().then().catch() 来补捉.



## 使用 canvas 绘制图片遇到的跨域问题

```js
img.setAttribute('crossOrigin', 'anonymous'); // 允许跨域
```



## HTML5 新标签兼容 html5shiv.js

html5shiv.js



## CSS3 兼容 respond.js

respond.js让不支持css3Media Query的浏览器包括IE6-IE8等其他浏览器支持查询
越早引入越好，在ie下面看到页面闪屏的概率就越低



## es5-shim 和 es5-sham 的区别

  \> es5-shim.js and es5-shim.min.js monkey-patch a JavaScript context to contain all EcmaScript 5 methods that can be faithfully emulated with a legacy JavaScript engine.
shim 完美模拟了所有 ES5 中可以被完美模拟的方法。有点绕，就是说 ES5 中有些方法，是可以在旧 JS 引擎中完美模拟了，那么 shim 就完美模拟了它们。

\> es5-sham.js and es5-sham.min.js monkey-patch other ES5 methods as closely as possible. For these methods, as closely as possible to ES5 is not very close. Many of these shams are intended only to allow code to be written to ES5 without causing run-time errors in older engines. In many cases, this means that these shams cause many ES5 methods to silently fail. Decide carefully whether this is what you want. Note: es5-sham.js requires es5-shim.js to be able to work properly.
这一段别看这么多，核心意思就是 ES5 中其他无法被完美模拟的方法，就由 sham 承包了。 sham 只承诺你用的时候代码不会崩溃，至于对应的方法是不是起作用它就不保证了，它只是尽力模拟(as close as possible)  



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