# event 事件相关



## 鼠标左键按住不放事件

`onmousedown`

​	通过 `event.button` 来判断

### 不同浏览器下的 event.button 值

+ IE下
  没有按键动作的时候 window.event.button = 0
  左键是 window.event.button = 1
  中键是 window.event.button = 4
  右键是 window.event.button = 2
+ Firefox下
  没有按键动作的时候 event.button = 0
  左键是 event.button = 0
  中键是 event.button = 1
  右键是 event.button = 2

---



## 自定义事件

[MDN-CustomEvent][1]

[MDN-create][2]

+ 创建

```js
// 不需要设置信息
var event = new Event( 'test' );

// 设置更多信息
var event = new CustomEvent( typeArg, CustomEventInit );
```

```js
// 过时的方法
// Create the event.
var event = document.createEvent('Event');

// Define that the event name is 'build'.
event.initEvent('build', true, true);

// Listen for the event.
document.addEventListener('build', function (e) {
  // e.target matches document from above
}, false);

// target can be any Element or other EventTarget.
document.dispatchEvent(event);
```

+ 触发: `dispatchEvent`

  参数: `event` 对象, `dom` 对象触发

```js
var cusE = new CustomEvent( 'test' );
document.body.onclick = function ( e ) {
    e.target.dispatch( cusE );
};
```

`typeArg`

​	一个代表 `event` 名字的字符串

`CustomEventInit`

​	初始化 `event` 

- `detail`: optional and defaulting to `null`, of type any, that is a event-dependant value associated with the event.   可选的默认值是 null 的任意类型数据，是一个与 event 相关的值
- `bubbles`: 一个布尔值，表示该事件能否冒泡。 来自 `EventInit`。注意：测试chrome默认为不冒泡。
- `cancelable`: 一个布尔值，表示该事件是否可以取消。 来自 `EventInit`

---



## 取消冒泡

+ IE

  ```js
  e.cancelBubble = true;
  ```

+ W3C

  ```js
  e.stopPropagation();
  ```

+ 兼容写法

```js
window.event ? window.event.cancelBubble = true : e.stopPropagation();
event = event || window.event;
```



---



## 阻止默认行为

+ IE

  ```js
  e.returnValue = false;
  ```

+ W3C

  ```js
  e.preventDefault()
  ```

> 注意: javascript的return false只会阻止默认行为，而是用 `jQuery` 的话则既阻止默认行为又防止对象冒泡。

---



[1]: https://developer.mozilla.org/zh-CN/docs/Web/API/CustomEvent/CustomEvent
[2]: https://developer.mozilla.org/zh-CN/docs/Web/Guide/Events/Creating_and_triggering_events